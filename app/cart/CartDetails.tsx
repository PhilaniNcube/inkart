"use client"

import Container from "@/components/layout/Container";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"
import { formatPrice } from "@/lib/utils";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { increment, decrement, remove, clear, totalPriceSelector } from "@/app/store/features/cartSlice";
import { Separator } from "@/components/ui/separator";

const CartDetails = () => {

const cartItems = useAppSelector((state) => state.cart.cartItems);
const totalPrice = useAppSelector(totalPriceSelector);

 const dispatch = useAppDispatch();

console.log({cartItems})

const shipping = 3000

  return (
    <Container>
      <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="w-full mt-5">
          <h3 className="text-semibold">Your cart is empty</h3>
          <Link href="/products">
            <Button type="button">Back To Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          <div className="w-full border-t-2 border-neutral-100 py-4 flex flex-col col-span-1 lg:col-span-2 gap-6 mt-8">
            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="w-full flex gap-4 items-center relative border-b border-neutral-300 py-2"
              >
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => dispatch(remove(item))}
                  className="absolute top-0 right-0 h-8 w-8 p-0"
                >
                  <Trash2Icon size={20} />
                </Button>
                <Image
                  src={item.image}
                  width={400}
                  height={400}
                  className="w-1/4 object-cover aspect-square"
                  alt={item.size}
                />
                <div className="flex-1 flex flex-col justify-start items-start h-full">
                  <h3 className="text-md font-medium text-slate-800">
                    {item.productTitle}
                  </h3>
                  <p className="text-sm text-neutral-500">{item.size}</p>
                  <p className="text-lg font-semibold text-neutral-800">
                    {formatPrice(item.price)} / each
                  </p>
                  <Separator className="my-8" />
                  <p className="text-lg font-semibold text-neutral-800">
                    Item Total {formatPrice(item.price * item.qty)}
                  </p>
                </div>
                <div className="w-1/4 flex justify-between items-center">
                  <Button onClick={() => dispatch(decrement(item))}>
                    <MinusIcon />
                  </Button>
                  <p className="text-lg font-semibold text-neutral-800">
                    {item.qty}
                  </p>
                  <Button onClick={() => dispatch(increment(item))}>
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-6 bg-slate-100">
            <h2 className="font-semibold text-xl">Order Summary</h2>
            <div className="w-full">
              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-medium text-neutral-800">Subtotal</p>
                <p className="text-lg font-medium text-neutral-800">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-medium text-neutral-800">
                  Shipping Estimate
                </p>
                <p className="text-lg font-medium text-neutral-800">
                  {formatPrice(shipping)}
                </p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center mt-6">
                <p className="text-xl font-semibold text-neutral-800">
                  Order Total
                </p>
                <p className="text-xl font-semibold text-neutral-800">
                  {formatPrice(totalPrice + shipping)}
                </p>
              </div>
              <Separator className="my-2" />
              <Link href="/checkout">
                <Button type="button" className="w-full">Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
export default CartDetails;
