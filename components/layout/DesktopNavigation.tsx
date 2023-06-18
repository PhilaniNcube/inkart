"use client"

import { totalCartItemsSelector } from "@/app/store/features/cartSlice";
import { useAppDispatch } from "@/app/store/store";
import { User } from "@supabase/auth-helpers-nextjs";
import { SearchIcon, ShoppingCartIcon, User2Icon, UserPlus2Icon } from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation"
import { FormEvent } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useSupabase } from "../Providers/SupabaseProvider";
import { Database } from "@/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type ComponentProps = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const DesktopNavigation = ({user, categories}:ComponentProps) => {



  const router = useRouter()

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const {query} = Object.fromEntries(new FormData(e.currentTarget))

    router.push(`/products/search?query=${query}`)
  }

  const qty = useSelector(totalCartItemsSelector)



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
            Ink Art
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

          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded-r-full"
          >
            <SearchIcon className="" />
          </button>
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
          {user === null ? (
            <>
              <Link href="/login" className="flex flex-col items-center">
                <User2Icon size={20} strokeWidth={1} />
                <span className="text-xs text-slate-800 font-semibold">
                  Login
                </span>
              </Link>
              <Link href="/register" className="flex flex-col items-center">
                <UserPlus2Icon size={20} strokeWidth={1} />
                <span className="text-xs text-slate-800 font-semibold">
                  Register
                </span>
              </Link>
            </>
          ) : (
            <div>
              <Button variant="destructive" onClick={signOut}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full pt-3 hidden lg:flex items-center justify-start space-x-4">
        <NavigationMenu className="justify-start">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {categories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {category.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <Link
          href="/products?page=1"
          className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md"
        >
          Browse Products
        </Link>
        <Link
          href="/products/best-sellers"
          className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md"
        >
          Best Sellers
        </Link>
        <Link
          href="/accessories"
          className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md"
        >
          Accessories
        </Link>
        <Link
          href="/terms-and-conditions"
          className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md"
        >
          Terms and Conditions
        </Link>
        <Link
          href="/about-us"
          className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md"
        >
          About Us
        </Link> */}
      </div>
    </div>
  );
};
export default DesktopNavigation;
