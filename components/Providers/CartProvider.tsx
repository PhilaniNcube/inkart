"use client"

import React, { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

// With Zustand we don't need a provider since it uses a store hook pattern
// This component is kept for backward compatibility and in case we need
// to add more functionality in the future
const CartProvider = ({ children }: Props) => {
  return <>{children}</>;
};
export default CartProvider;
