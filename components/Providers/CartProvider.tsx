"use client"

import { store } from "@/app/store/store";
import React, {ReactNode} from "react";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

const CartProvider = ({children}:Props) => {
  return <Provider store={store}>{children}</Provider>;
};
export default CartProvider;
