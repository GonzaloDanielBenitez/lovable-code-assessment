
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, Purpose, TimeSlot } from '@/pages/Index';

interface MatchingResult {
  matched: boolean;
  match_id?: string;
  request_id: string;
}

export const useMatching = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitMatchingRequest = async (
    userRole: UserRole,
    purpose: Purpose,
    timeSlot: TimeSlot
  ) => {
    if (!userRole || !purpose || !timeSlot) {
      setError('Missing required fields');
      return null;
    }

    setIsMatching(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('match-users', {
        body: {
          user_role: userRole,
          purpose: purpose,
          time_slot: timeSlot
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Match response:', data);
      setMatchResult(data);
      return data;
    } catch (err) {
      console.error('Matching error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsMatching(false);
    }
  };

  const listenForMatch = (requestId: string, onMatch: (match: any) => void) => {
    console.log('Setting up realtime listener for request:', requestId);
    
    const channel = supabase
      .channel('matching_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'matching_requests',
          filter: `id=eq.${requestId}`
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          if (payload.new.status === 'matched') {
            onMatch(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up realtime listener');
      supabase.removeChannel(channel);
    };
  };

  return {
    isMatching,
    matchResult,
    error,
    submitMatchingRequest,
    listenForMatch,
    setMatchResult
  };
};
