"use client"

import Image from "next/image";
import { SearchIcon, ShoppingCartIcon, User2Icon, UserPlus2Icon } from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation"
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { useSupabase } from "../Providers/SupabaseProvider";
import { Database } from "@/types";
import { useCartStore } from "@/app/store/cartStore";
import { User } from "@supabase/supabase-js";

type ComponentProps = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  admin: boolean
};

const DesktopNavigation = () => {



  const router = useRouter()
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const {query} = Object.fromEntries(new FormData(e.currentTarget))

    router.push(`/products/search?query=${query}`)
  }

  // Use Zustand cart store instead of Redux selector
  const cartItems = useCartStore((state) => state.cartItems);
  const qty = cartItems.reduce((total, item) => total + item.qty, 0);

  const {supabase} = useSupabase()

  const signOut = async () => {
   const {error} = await supabase.auth.signOut()

    if(error) {
      throw new Error(error.message)
    }
    alert(`Signed Out`)
    router.push('/')
  }

  return (
    <div className="w-full">
      <div className="w-full md:flex justify-between items-center space-x-8 hidden">
        <div>
          <Link href="/" className="text-slate-800 font-semibold text-lg">
            <Image src="/images/ink_logo.jpeg" alt="logo" width={50} height={50} className="w-20 aspect-square object-cover" />
          </Link>
        </div>{" "}
        <form onSubmit={handleSubmit} className="flex-1 flex ">
          <input
            type="search"
            id="query"
            name="query"
            className="w-full border border-slate-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-0"
            placeholder="Search for products"
          />

          <Button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded-r-full"
          >
            <SearchIcon className="" />
          </Button>
        </form>
        <div className="flex space-x-5 items-center ">
          <Link href="/cart" className="flex flex-col relative items-center">
            <ShoppingCartIcon size={20} strokeWidth={1} />
            <span className="text-xs text-slate-800 font-semibold">Cart</span>
            {qty > 0 && (
              <span className="text-xs absolute -top-1 h-4 w-4 flex items-center justify-center -right-2 bg-red-500 text-white rounded-full ">
                {qty}
              </span>
            )}
          </Link>

        </div>
      </div>
      <div className="w-full pt-3 hidden lg:flex items-center justify-start space-x-4">
        <Link href="/products" className="text-slate-800 font-semibold text-lg">
          Products
        </Link>
        <Link href="/categories" className="text-slate-800 font-semibold text-lg">
          Categories
        </Link>
        <Link href="/about-us" className="text-slate-800 font-semibold text-lg">
          About Us
        </Link>
        <Link href="/contact" className="text-slate-800 font-semibold text-lg">
          Contact Us
        </Link>

      </div>
    </div>
  );
};
export default DesktopNavigation;
