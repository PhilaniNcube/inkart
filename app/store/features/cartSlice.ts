import { CartItem, Product } from "@/schema";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
    increment: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find((i) => i.variantId === action.payload.variantId);

      if(item) item.qty++; else {
        state.cartItems.push({
          productId: action.payload.productId,
          qty: 1,
          variantId: action.payload.variantId,
          variantSKU: action.payload.variantSKU,
          size: action.payload.size,
          image: action.payload.image,
          price: action.payload.price,
          productTitle: action.payload.productTitle,

        });
      }

    },

    // Decrement the quantity of an item in the cart
    decrement: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find((i) => i.variantId === action.payload.variantId);

            if(item){
              item.qty--;
              if(item.qty === 0){
                state.cartItems = state.cartItems.filter((item) => item.variantId !== action.payload.variantId);
              }
            }
          },

    remove: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find((i) => i.variantId === action.payload.variantId);
      if(item) {
        state.cartItems = state.cartItems.filter((i) => i.variantId!== action.payload.variantId);
      }
    },
    clear: (state) => {
      state.cartItems = [];
    },
  }
})

const cartItems = (state:RootState) => state.cart.cartItems;

export const totalCartItemsSelector = createSelector([cartItems], (cartItems:CartItem[]) => cartItems.reduce((acc, item) => (acc += item.qty), 0))

export const totalPriceSelector = createSelector([cartItems], (cartItems:CartItem[]) => cartItems.reduce((acc, item) => (acc += item.qty * item.price), 0))

export const productQtySelector = createSelector([cartItems, (cartItems:CartItem[], variantId:number) => variantId], (cartItems, variantId) => cartItems.find(el => el.variantId === variantId)?.qty )


export const { increment, decrement, remove, clear } = cartSlice.actions;



export default cartSlice.reducer;
