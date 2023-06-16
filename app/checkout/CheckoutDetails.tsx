/* eslint-disable @next/next/no-img-element */
"use client"
import Container from "@/components/layout/Container";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import {
  increment,
  decrement,
  remove,
  clear,
  totalPriceSelector,
} from "@/app/store/features/cartSlice";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { Database } from "@/types";
import Link from "next/link";

type Props = {
  exchangeRate: number;
  order: Database['public']['Tables']['orders']['Row'];
}

const CheckoutDetails = ({exchangeRate, order}:Props) => {



  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  const dispatch = useAppDispatch();

  const shipping = 3000;

  const amount = (exchangeRate * (shipping + totalPrice)) / 100;


  // const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {

  //   e.preventDefault();
  //   console.log('Submitting payment request');

  //   const data = Object.fromEntries(new FormData(e.currentTarget))

  //   console.log({ data });



  //   const req = await fetch(`/api/payment`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })

  //   const res = await req.text();

  //   console.log(res);


  // }

  return (
    <main>
      <Container>
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
          Checkout
        </h1>
        <Separator className="my-4" />
        <form
          method="POST"
          action="https://sandbox.payfast.co.za/eng/process"
          className="flex w-full gap-10"
        >
          <input type="hidden" name="merchant_id" value="10000100" />
          <input type="hidden" name="merchant_key" value="46f0cd694581a" />
          <input
            type="hidden"
            name="amount"
            value={(
              exchangeRate *
              ((order.total + order.shipping) / 100)
            ).toFixed(2)}
          />
          <input type="hidden" name="item_name" value={order.id}></input>
          <input
            type="hidden"
            name="return_url"
            value={`${process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL}?order_id=${order.id}`}
          />
          <input
            type="hidden"
            name="cancel_url"
            value={process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL}
          />
          <input
            type="hidden"
            name="notify_url"
            value={`${process.env.NEXT_PUBLIC_PAYFAST_NOTIFY_URL}?order_id=${order.id}`}
          />
          <input type="hidden" name="name_first" value={order.first_name} />
          <input type="hidden" name="name_last" value={order.last_name} />
          <input type="hidden" name="email_address" value={order.email} />
          <input type="hidden" name="cell_number" value={order.phone} />
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-semibold">
              Billing Details
            </h2>

            <div className="mt-6">
              <p className="text-lg ">First Name: {order.first_name}</p>
              <p className="text-lg  mt-2">Last Name: {order.last_name}</p>
              <p className="text-lg  mt-2">Email: {order.email}</p>
              <p className="text-lg  mt-2">Phone: {order.phone}</p>
              <p className="text-lg  mt-2">Address: {order.address}</p>
              <p className="text-lg  mt-2">City: {order.city}</p>
              <p className="text-lg  mt-2">State: {order.state}</p>
              <p className="text-lg  mt-2">Postal Code: {order.postal_code}</p>
            </div>
          </div>{" "}
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-semibold">Order Summary</h2>
            <div className="border mt-3 border-neutral-200 rounded-md  py-6 bg-slate-50">
              {order.order_items.length === 0 ? (
                <p className="px-3">Your cart is empty</p>
              ) : (
                <div className="flex flex-col space-y-4">
                  {order.order_items.map((item, i) => (
                    <div
                      key={i}
                      className="w-full flex gap-2 px-2 border-b border-slate-300 py-2"
                    >
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        className="w-24 h-24 aspect-square"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {item.productTitle}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {item.size} x {item.qty}
                        </p>
                        <p className="text-sm text-slate-400">
                          {formatPrice(item.price * item.qty)}
                        </p>

                        {/* <div className="w-1/4 flex justify-between items-center">
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => dispatch(decrement(item))}
                          >
                            <MinusIcon />
                          </Button>
                          <p className="text-lg font-semibold text-neutral-800">
                            {item.qty}
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => dispatch(increment(item))}
                          >
                            <PlusIcon />
                          </Button>
                        </div> */}
                      </div>
                      {/* <div className="flex flex-col justify-between">
                        <p className="text-lg font-semibold">
                          {formatPrice(item.price * item.qty)}
                        </p>
                        <Button
                          onClick={() => dispatch(remove(item))}
                          type="button"
                          variant="destructive"
                          className="text-lg font-semibold"
                        >
                          <Trash2Icon />
                        </Button>
                      </div> */}
                    </div>
                  ))}
                </div>
              )}

              <div className="w-full">
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="text-lg font-semibold">Subtotal</p>
                  <p className="text-lg font-semibold">
                    {order.subtotal !== null
                      ? formatPrice(order.subtotal)
                      : formatPrice(order.total)}
                  </p>
                </div>
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="text-lg font-semibold">Shipping</p>
                  <p className="text-lg font-semibold">
                    {order.shipping
                      ? formatPrice(order.shipping)
                      : formatPrice(shipping)}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="text-2xl font-semibold">Total</p>
                  <p className="text-2xl font-semibold">
                    {order.subtotal !== null
                      ? formatPrice(order.shipping + order.total)
                      : formatPrice(shipping + order.total)}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex px-4">
                  {order.paid ? (
                    <Link href="/">
                      <Button type="button" variant="link"  className="mt-3 w-full">
                        Order Has Already Been Paid - Back to Home Page
                      </Button>
                    </Link>
                  ) : (
                    <Button type="submit" className="mt-3 w-full">
                      Checkout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </main>
  );
};
export default CheckoutDetails;
