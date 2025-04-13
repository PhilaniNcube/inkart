"use client"

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  variantId: string;
  variantSKU: string;
  productTitle: string;
  price: number;
  qty: number;
  size: string;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increment: (item: CartItem) => void;
  decrement: (item: CartItem) => void;
  remove: (item: CartItem) => void;
  clear: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem.variantId === item.variantId
        );
        
        if (existingItemIndex >= 0) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].qty += item.qty;
          return { cartItems: updatedCartItems };
        } else {
          return { cartItems: [...state.cartItems, item] };
        }
      }),
      
      increment: (item) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem.variantId === item.variantId
        );
        
        if (existingItemIndex >= 0) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].qty += 1;
          return { cartItems: updatedCartItems };
        }
        return state;
      }),
      
      decrement: (item) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem.variantId === item.variantId
        );
        
        if (existingItemIndex >= 0) {
          const updatedCartItems = [...state.cartItems];
          if (updatedCartItems[existingItemIndex].qty > 1) {
            updatedCartItems[existingItemIndex].qty -= 1;
            return { cartItems: updatedCartItems };
          } else {
            return {
              cartItems: state.cartItems.filter(
                (cartItem) => cartItem.variantId !== item.variantId
              )
            };
          }
        }
        return state;
      }),
      
      remove: (item) => set((state) => ({
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.variantId !== item.variantId
        )
      })),
      
      clear: () => set({ cartItems: [] }),
      
      totalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.qty, 
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
