// src/lib/supabase/types.ts
// Minimal type definitions - extend as needed
// You can generate full types via: supabase gen types typescript --project-id <id>

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      test_rides: {
        Row: {
          id: string;
          user_id: string;
          motorcycle_id: string;
          preferred_date: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes: string | null;
          rider_name: string | null;
          rider_email: string | null;
          rider_phone: string | null;
          preferred_time: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          motorcycle_id: string;
          preferred_date: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string | null;
          rider_name?: string | null;
          rider_email?: string | null;
          rider_phone?: string | null;
          preferred_time?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          motorcycle_id?: string;
          preferred_date?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string | null;
          rider_name?: string | null;
          rider_email?: string | null;
          rider_phone?: string | null;
          preferred_time?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'test_rides_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
}
