import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

export type TestRide = Database['public']['Tables']['test_rides']['Row'];

export async function getUserTestRides(): Promise<TestRide[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('test_rides')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load test rides:', error.message);
    return [];
  }

  return data ?? [];
}