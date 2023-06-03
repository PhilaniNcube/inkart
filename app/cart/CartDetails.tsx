"use client"

import Container from "@/components/layout/Container";
import { useAppSelector } from "../store/store";

const CartDetails = () => {

const cartItems = useAppSelector((state) => state.cart.cartItems);

console.log({cartItems})

  return <Container>CartDetails</Container>;
};
export default CartDetails;
