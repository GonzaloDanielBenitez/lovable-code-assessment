
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_role, purpose, time_slot } = await req.json()

    console.log('Matching request received:', { user_role, purpose, time_slot })

    // Clean up expired requests first
    await supabase.rpc('cleanup_expired_requests')

    // Insert the new matching request
    const { data: newRequest, error: insertError } = await supabase
      .from('matching_requests')
      .insert({
        user_role,
        purpose,
        time_slot,
        status: 'waiting'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      throw insertError
    }

    console.log('New request created:', newRequest)

    // Look for a matching request (opposite role, same purpose and time)
    const oppositeRole = user_role === 'taker' ? 'giver' : 'taker'
    
    const { data: matchingRequests, error: searchError } = await supabase
      .from('matching_requests')
      .select('*')
      .eq('user_role', oppositeRole)
      .eq('purpose', purpose)
      .eq('time_slot', time_slot)
      .eq('status', 'waiting')
      .order('created_at', { ascending: true })
      .limit(1)

    if (searchError) {
      console.error('Search error:', searchError)
      throw searchError
    }

    console.log('Found matching requests:', matchingRequests)

    if (matchingRequests && matchingRequests.length > 0) {
      const matchedRequest = matchingRequests[0]

      // Create a match record
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .insert({
          taker_request_id: user_role === 'taker' ? newRequest.id : matchedRequest.id,
          giver_request_id: user_role === 'giver' ? newRequest.id : matchedRequest.id,
          purpose,
          time_slot,
          meeting_location: 'SCU Dining Hall'
        })
        .select()
        .single()

      if (matchError) {
        console.error('Match creation error:', matchError)
        throw matchError
      }

      // Update both requests as matched
      const { error: updateError1 } = await supabase
        .from('matching_requests')
        .update({ 
          status: 'matched', 
          matched_at: new Date().toISOString(),
          matched_with: matchedRequest.id 
        })
        .eq('id', newRequest.id)

      const { error: updateError2 } = await supabase
        .from('matching_requests')
        .update({ 
          status: 'matched', 
          matched_at: new Date().toISOString(),
          matched_with: newRequest.id 
        })
        .eq('id', matchedRequest.id)

      if (updateError1 || updateError2) {
        console.error('Update errors:', updateError1, updateError2)
        throw updateError1 || updateError2
      }

      console.log('Match created successfully:', match)

      return new Response(
        JSON.stringify({ 
          matched: true, 
          match_id: match.id,
          request_id: newRequest.id 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      console.log('No match found, waiting for match')
      
      return new Response(
        JSON.stringify({ 
          matched: false, 
          request_id: newRequest.id 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

  } catch (error) {
    console.error('Error in match-users function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
