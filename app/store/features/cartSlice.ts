import { CartItem, Product } from "@/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Increment the quantity of an item in the cart

  }
})
