"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CartItem } from "@/app/store/cartStore";

// Define validation schema for order
const orderSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  cart_items: z.array(
    z.object({
      variantId: z.string(),
      variantSKU: z.string(),
      productTitle: z.string(),
      price: z.number(),
      qty: z.number(),
      size: z.string(),
      image: z.string(),
    })
  ),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
});

// Define return type for the action
type OrderState = {
  error?: string;
  success?: boolean;
  order_id?: string;
};

// Server action to create a new order
export async function createOrder(
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  try {
    // Get cart items from form data
    const cartItemsStr = formData.get("cart_items") as string;
    let cartItems: CartItem[] = [];
    
    try {
      cartItems = JSON.parse(cartItemsStr);
    } catch (error) {
      return { 
        error: "Invalid cart data", 
        success: false 
      };
    }

    // Calculate values
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    const shipping = Number(formData.get("shipping")) || 3000; // Default shipping cost
    const total = subtotal + shipping;

    // Validate form data
    const validatedFields = orderSchema.safeParse({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      postal_code: formData.get("postal_code"),
      cart_items: cartItems,
      subtotal,
      shipping,
      total,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0]?.message || "Invalid form data",
        success: false,
      };
    }

  
    const supabase = await createClient();

    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser();

    // Insert into orders table
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          first_name: validatedFields.data.first_name,
          last_name: validatedFields.data.last_name,
          email: validatedFields.data.email,
          phone: validatedFields.data.phone,
          address: validatedFields.data.address,
          city: validatedFields.data.city,
          state: validatedFields.data.state,
          postal_code: validatedFields.data.postal_code,
          order_items: cartItems,
          subtotal: validatedFields.data.subtotal,
          shipping: validatedFields.data.shipping,
          total: validatedFields.data.total,
          paid: false,
          user_id: user?.id,
        }
      ])
      .select("id")
      .single();

    if (orderError) {
      return {
        error: orderError.message,
        success: false,
      };
    }

    // Revalidate relevant paths
    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/dashboard/orders");
    
    return {
      success: true,
      order_id: orderData.id,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create order",
      success: false,
    };
  }
}

