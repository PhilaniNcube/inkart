"use client";

import Image from "next/image";
import {
  SearchIcon,
  ShoppingCartIcon,
  User2Icon,
  UserPlus2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { useSupabase } from "../Providers/SupabaseProvider";
import { Database } from "@/types";
import { useCartStore } from "@/app/store/cartStore";
import { User } from "@supabase/supabase-js";
import { Input } from "../ui/input";

type ComponentProps = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  admin: boolean;
};

const DesktopNavigation = () => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { query } = Object.fromEntries(new FormData(e.currentTarget));

    router.push(`/products/search?query=${query}`);
  };

  // Use Zustand cart store instead of Redux selector
  const cartItems = useCartStore((state) => state.cartItems);
  const qty = cartItems.reduce((total, item) => total + item.qty, 0);

  const { supabase } = useSupabase();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
    alert(`Signed Out`);
    router.push("/");
  };

  return (
    <div className="w-full">
      <div className="items-center justify-between hidden w-full space-x-8 md:flex">
        <div>
          <Link href="/" className="text-lg font-semibold text-slate-800">
            <Image
              src="/images/ink-art.webp"
              width={209}
              height={136}
              alt="Logo"
              className="object-cover w-24"
            />
          </Link>
        </div>{" "}
        <form onSubmit={handleSubmit} className="flex flex-1 ">
          <Input
            type="search"
            id="query"
            name="query"
            className="w-full px-4 py-2 border rounded-l-full border-slate-300 focus:outline-none focus:ring-0"
            placeholder="Search for products"
          />

          <Button
            type="submit"
            className="px-4 py-1 text-white bg-blue-600 rounded-r-full"
          >
            <SearchIcon className="" />
          </Button>
        </form>
        <div className="flex items-center space-x-5 ">
          <Link href="/cart" className="relative flex flex-col items-center">
            <ShoppingCartIcon size={20} strokeWidth={1} />
            <span className="text-xs font-semibold text-slate-800">Cart</span>
            {qty > 0 && (
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 ">
                {qty}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="items-center justify-start hidden w-full pt-3 space-x-4 lg:flex">
        <Link href="/products" className="text-lg font-semibold text-slate-800">
          Products
        </Link>
        <Link
          href="/categories"
          className="text-lg font-semibold text-slate-800"
        >
          Categories
        </Link>
        <Link href="/about-us" className="text-lg font-semibold text-slate-800">
          About Us
        </Link>
        <Link
          href="/contact-us"
          className="text-lg font-semibold text-slate-800"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};
export default DesktopNavigation;
