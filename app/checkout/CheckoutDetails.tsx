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

const CheckoutDetails = ({exchangeRate}:{exchangeRate: number}) => {

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  const dispatch = useAppDispatch();

  const shipping = 3000;

  const amount = (exchangeRate * (shipping + totalPrice)) / 100;


  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    console.log('Submitting payment request');

    const data = Object.fromEntries(new FormData(e.currentTarget))

    console.log({ data });



    const req = await fetch(`/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const res = await req.text();

    console.log(res);


  }

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
          <div className="w-full">
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-semibold mb-8">
                Contact Information
              </h2>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  className=""
                  required
                />
              </div>

              <Separator className="my-4" />

              <input type="hidden" name="merchant_id" value="10000100" />
              <input type="hidden" name="merchant_key" value="46f0cd694581a" />
              <input
                type="hidden"
                name="return_url"
                value={`${process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL}`}
              />
              <input
                type="hidden"
                name="cancel_url"
                value={`${process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL}`}
              />

              <input
                type="hidden"
                name="notify_url"
                value={`${process.env.NEXT_PUBLIC_PAYFAST_NOTIFY_URL}`}
              />

              <input
                type="hidden"
                name="amount"
                value={amount.toFixed(2)}
              />
              <input
                type="hidden"
                name="item_name"
                value={cartItems.map((item) => {
                  return `sku:${item.variantSKU}-`;
                })}
              />
              <input
                type="hidden"
                name="item_description"
                value={cartItems.map((item) => `name:${item.productTitle}-`)}
              />
              <input type="hidden" name="custom_int1" value="2" />
              <input
                type="hidden"
                name="custom_str1"
                value="Extra order information"
              />

              <h2 className="text-xl md:text-2xl font-semibold mb-8">
                Shipping Information
              </h2>
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder=""
                    className=""
                    required
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder=""
                    className=""
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col w-full space-y-2 mt-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder=""
                  className=""
                  required
                />
              </div>

              <div className="flex w-full gap-4 mt-4">
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder=""
                    className=""
                    required
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    placeholder=""
                    className=""
                    autoComplete="state"
                    required
                  />
                </div>
              </div>
              <div className="flex w-full gap-4 mt-4">
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    placeholder=""
                    autoComplete="postal_code"
                    className=""
                    required
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder=""
                    className=""
                    autoComplete="phone"
                    required
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-semibold">Order Summary</h2>
            <div className="border border-neutral-200 rounded-md  py-6 bg-slate-50">
              {cartItems.length === 0 ? (
                "Your cart is empty"
              ) : (
                <div className="flex flex-col space-y-4">
                  {cartItems.map((item, i) => (
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
                        <p className="text-sm text-slate-400">{item.size}</p>

                        <div className="w-1/4 flex justify-between items-center">
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
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
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
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="w-full">
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="text-lg font-semibold">Subtotal</p>
                  <p className="text-lg font-semibold">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="text-lg font-semibold">Shipping</p>
                  <p className="text-lg font-semibold">
                    {formatPrice(shipping)}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center px-2 py-4">
                  <p className="text-2xl font-semibold">Total</p>
                  <p className="text-2xl font-semibold">
                    {formatPrice(shipping + totalPrice)}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex px-4">
                  <Button type="submit" className="mt-3 w-full">
                    Checkout
                  </Button>
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
