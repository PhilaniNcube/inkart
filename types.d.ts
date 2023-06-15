import { CartItem } from "./schema"

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
          created_at: string
          user_id: string | null
          order_items: CartItem[]
          first_name: string
          last_name: string
          address: string
          city: string
          state: string
          postal_code: string
          phone: string
          email: string
          total: number
          subtotal: number
          shipping: number
          paid: boolean
          payment_id: string
          paid_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string
          order_items?: CartItem[]
          first_name?: string
          last_name?: string
          address?: string
          city?: string
          state?: string
          postal_code?: string
          phone?: string
          email?: string
          total?: number
          subtotal?: number
          shipping?: number
          paid?: boolean
          payment_id?: string
          paid_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          order_items?: CartItem[]
          first_name?: string
          last_name?: string
          address?: string
          city?: string
          state?: string
          postal_code?: string
          phone?: string
          email?: string
          total?: number
          subtotal?: number
          shipping?: number
          paid?: boolean
          payment_id?: string
          paid_at?: string
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

