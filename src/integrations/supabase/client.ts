// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mywtimrenutzataadgyz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3RpbXJlbnV0emF0YWFkZ3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTI1NTcsImV4cCI6MjA2NDg4ODU1N30._Y7mp8SNOokUW4lumRk5nGad7koU5kJ2wDBs6ZPaEdc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);