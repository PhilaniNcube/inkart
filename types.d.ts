import { CartItem } from "./schema"

export type Json =
  | string
  | number
  | boolean

  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          image: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          image?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          image?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
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
      product_categories: {
        Row: {
          category_id: Database['public']['Tables']['categories']['Row']
          product_id: Database['public']['Tables']['products']['Row']
          created_at: string
        }
        Insert: {
          category_id?: string
          product_id?: string
          created_at?: string
        }
        Update: {
          category_id?: string
          product_id?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          tags: string[]
          options: {
          name: string;
          type: string;
          values: {
            id: number;
            title: string;
          }[]
          }[];
          variants: {
            id: number;
            sku: string;
            cost: number;
            price: number;
            title: string;
            grams: number;
            is_enabled: boolean;
            is_default: boolean;
            is_available: boolean;
            options: number[];
            quantity: number;
            }[];
          images: {
            src: string;
            position: string;
            is_default: boolean;
            variant_id: number;
            variant_ids: number[];
            is_selected_for_publishing: boolean;
          }[];
          updated_at: string
          visible: boolean
          is_locked: boolean
          blueprint_id: number
          user_id: number
          shop_id: number
          print_provider_id: number
          print_areas: {
            background: string;
            variant_ids: number[];
            placeholders: {
              images: {
                x: number;
                y: number;
                id:string;
                name: string;
                type: string;
                angle: number;
                scale: number;
                width: number;
                height: number;
              }[]
              position: string;
            }[]
          }[]
          print_details: {
            print_on_side: string;
          }
          sales_channel_properties: any[];
          twodaydelivery_enabled: boolean;
          featured: boolean;
          category: {
            id: string;
            title: string;
            slug: string;
            created_at: string;
          }
        }
        Insert: {
          id: string
          created_at?: string
          title: string
          description: string
          tags?: string[]
          options?: {
          name: string;
          type: string;
          values: {
            id: number;
            title: string;
          }[]
          }[];
          variants?: {
          id?: number;
          sku?: string;
          cost?: number;
          price?: number;
          title?: string;
          grams?: number;
          is_enabled?: boolean;
          is_default?: boolean;
          is_available?: boolean;
          options?: number[];
          quantity?: number;
          }[];
          images?:  {
            src: string;
            position: string;
            is_default: boolean;
            variant_id: number;
            variant_ids: number[];
            is_selected_for_publishing: boolean;
          }[];
          updated_at?: string
          visible?: boolean
          is_locked?: boolean
          blueprint_id?: number
          user_id?: number
          shop_id?: number
          print_provider_id?: number
          print_areas?: {
            background?: string;
            variant_ids: number[];
            placeholders: {
              images: {
                x: number;
                y: number;
                id:string;
                name: string;
                type: string;
                angle: number;
                scale: number;
                width: number;
                height: number;
              }[]
              position: string;
            }[]
          }[]
          print_details?:  {
            print_on_side: string;
          }
          sales_channel_properties?: any[]
          twodaydelivery_enabled?: boolean
          featured?:boolean
          category?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          tags?: string[]
          options?: {
          name: string;
          type: string;
          values: {
            id: number;
            title: string;
          }[]
          }[];
          variants?: {
          id?: number;
          sku?: string;
          cost?: number;
          price?: number;
          title?: string;
          grams?: number;
          is_enabled?: boolean;
          is_default?: boolean;
          is_available?: boolean;
          options?: number[];
          quantity?: number;
          }[];
          images?:  {
            src: string;
            position: string;
            is_default: boolean;
            variant_id: string;
            variant_ids: string[];
            is_selected_for_publishing: boolean;
          }[];
          updated_at?: string
          visible?: boolean
          is_locked?: boolean
          blueprint_id?: number
          user_id?: number
          shop_id?: number
          print_provider_id?: number
          print_areas?: {
            background?: string;
            variant_ids: number[];
            placeholders: {
              images: {
                x: number;
                y: number;
                id:string;
                name: string;
                type: string;
                angle: number;
                scale: number;
                width: number;
                height: number;
              }[]
              position: string;
            }[]
          }[]
          print_details?:  {
            print_on_side: string;
          }
          sales_channel_properties?: any[]
          twodaydelivery_enabled?: boolean
          featured?:boolean
          category?: string
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
        }
        Insert: {
          id: string
          first_name?: string
          last_name?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_total_paid_orders: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
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

