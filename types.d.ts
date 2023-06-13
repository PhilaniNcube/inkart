export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
          order_items: Json | null
          first_name: string | null
          last_name: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          phone: string | null
          email: string | null
          total: number | null
          subtotal: number | null
          shipping: number | null
          paid: boolean | null
          payment_id: string | null
          paid_at: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          user_id?: string | null
          order_items?: Json | null
          first_name?: string | null
          last_name?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          phone?: string | null
          email?: string | null
          total?: number | null
          subtotal?: number | null
          shipping?: number | null
          paid?: boolean | null
          payment_id?: string | null
          paid_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          order_items?: Json | null
          first_name?: string | null
          last_name?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          phone?: string | null
          email?: string | null
          total?: number | null
          subtotal?: number | null
          shipping?: number | null
          paid?: boolean | null
          payment_id?: string | null
          paid_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          created_at: string | null
          title: string
          description: string
          tags: Json | null
          options: Json | null
          variants: Json | null
          images: Json | null
          updated_at: string | null
          visible: boolean | null
          is_locked: boolean | null
          blueprint_id: number | null
          user_id: number | null
          shop_id: number | null
          print_provider_id: number | null
          print_areas: Json | null
          print_details: Json | null
          sales_channel_properties: Json | null
          twodaydelivery_enabled: boolean | null
        }
        Insert: {
          id: string
          created_at?: string | null
          title: string
          description: string
          tags?: Json | null
          options?: Json | null
          variants?: Json | null
          images?: Json | null
          updated_at?: string | null
          visible?: boolean | null
          is_locked?: boolean | null
          blueprint_id?: number | null
          user_id?: number | null
          shop_id?: number | null
          print_provider_id?: number | null
          print_areas?: Json | null
          print_details?: Json | null
          sales_channel_properties?: Json | null
          twodaydelivery_enabled?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string | null
          title?: string
          description?: string
          tags?: Json | null
          options?: Json | null
          variants?: Json | null
          images?: Json | null
          updated_at?: string | null
          visible?: boolean | null
          is_locked?: boolean | null
          blueprint_id?: number | null
          user_id?: number | null
          shop_id?: number | null
          print_provider_id?: number | null
          print_areas?: Json | null
          print_details?: Json | null
          sales_channel_properties?: Json | null
          twodaydelivery_enabled?: boolean | null
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

