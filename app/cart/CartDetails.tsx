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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { useSupabase } from "@/components/Providers/SupabaseProvider";
import { useRouter } from "next/navigation";

const CartDetails = ({exchangeRate}:{exchangeRate: number}) => {

  const {supabase} = useSupabase()

  const router = useRouter()

const cartItems = useAppSelector((state) => state.cart.cartItems);
const totalPrice = useAppSelector(totalPriceSelector);

 const dispatch = useAppDispatch();

console.log({cartItems})

const shipping = 3000



  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {

      e.preventDefault();
      console.log('Saving order to database');

      const {address, city, email, first_name, last_name, phone, postal_code, state} = Object.fromEntries(new FormData(e.currentTarget))

      if(typeof address !== 'string' || typeof city !== 'string' || typeof email !== 'string' || typeof first_name !== 'string' || typeof last_name !== 'string' || typeof phone !== 'string' || typeof postal_code !== 'string' || typeof state !== 'string'){
         throw new Error('Invalid order details')
         return
      }

      const {data, error} = await supabase.from('orders').insert([
        {
          address,
          city,
          email,
          first_name,
          last_name,
          phone,
          postal_code,
          state,
          subtotal: totalPrice,
          total: totalPrice + shipping,
          order_items: cartItems,
          shipping: shipping,
          paid: false,
          user_id: (await supabase.auth.getUser()).data?.user?.id,
        }
      ]).select('*').single()

      console.log({data, error})

      if(error){
        throw new Error('Error saving order')

      } else {
        dispatch(clear())
        router.push(`/checkout?order_id=${data.id}`)

      }


  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="w-full border-t-2 border-neutral-100 py-4 flex flex-col col-span-1 gap-6 mt-8">
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
          <form onSubmit={handleSubmit} className="rounded-lg p-6 bg-slate-100">
            {/* <h2 className="font-semibold text-xl">Order Summary</h2> */}

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
                  className="bg-white"
                  required
                />
              </div>

              <Separator className="my-4" />

              {/* <input type="hidden" name="merchant_id" value="10000100" />
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

              <input type="hidden" name="amount" value={amount.toFixed(2)} />
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
              /> */}

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
                    className="bg-white"
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
                    className="bg-white"
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
                  className="bg-white"
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
                    className="bg-white"
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
                    className="bg-white"
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
                    className="bg-white"
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
                    className="bg-white"
                    autoComplete="phone"
                    required
                  />
                </div>
              </div>
            </div>

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
              <Button type="submit" className="w-full">
                Checkout
              </Button>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
};
export default CartDetails;
