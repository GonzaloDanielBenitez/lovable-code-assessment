export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      matches: {
        Row: {
          created_at: string
          giver_request_id: string
          id: string
          meeting_location: string | null
          purpose: Database["public"]["Enums"]["purpose_type"]
          taker_request_id: string
          time_slot: Database["public"]["Enums"]["time_slot"]
        }
        Insert: {
          created_at?: string
          giver_request_id: string
          id?: string
          meeting_location?: string | null
          purpose: Database["public"]["Enums"]["purpose_type"]
          taker_request_id: string
          time_slot: Database["public"]["Enums"]["time_slot"]
        }
        Update: {
          created_at?: string
          giver_request_id?: string
          id?: string
          meeting_location?: string | null
          purpose?: Database["public"]["Enums"]["purpose_type"]
          taker_request_id?: string
          time_slot?: Database["public"]["Enums"]["time_slot"]
        }
        Relationships: [
          {
            foreignKeyName: "matches_giver_request_id_fkey"
            columns: ["giver_request_id"]
            isOneToOne: false
            referencedRelation: "matching_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_taker_request_id_fkey"
            columns: ["taker_request_id"]
            isOneToOne: false
            referencedRelation: "matching_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_requests: {
        Row: {
          created_at: string
          id: string
          matched_at: string | null
          matched_with: string | null
          purpose: Database["public"]["Enums"]["purpose_type"]
          status: string
          time_slot: Database["public"]["Enums"]["time_slot"]
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          id?: string
          matched_at?: string | null
          matched_with?: string | null
          purpose: Database["public"]["Enums"]["purpose_type"]
          status?: string
          time_slot: Database["public"]["Enums"]["time_slot"]
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          id?: string
          matched_at?: string | null
          matched_with?: string | null
          purpose?: Database["public"]["Enums"]["purpose_type"]
          status?: string
          time_slot?: Database["public"]["Enums"]["time_slot"]
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "matching_requests_matched_with_fkey"
            columns: ["matched_with"]
            isOneToOne: false
            referencedRelation: "matching_requests"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_requests: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      purpose_type: "spark-ideas" | "make-friends" | "find-meaning"
      time_slot: "9am" | "2pm" | "7pm"
      user_role: "taker" | "giver"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      purpose_type: ["spark-ideas", "make-friends", "find-meaning"],
      time_slot: ["9am", "2pm", "7pm"],
      user_role: ["taker", "giver"],
    },
  },
} as const
