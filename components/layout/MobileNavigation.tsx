"use client"

import { MenuIcon, MenuSquareIcon, ShoppingBag, User2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SlideOver from "./SlideOver";
import { User } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { useSupabase } from "../Providers/SupabaseProvider";
import { useRouter } from "next/navigation";

type ComponentProps = {
  user: User | null;
};

const MobileNavigation = ({user}:ComponentProps) => {

  const [open, setOpen] = useState(false)

    const { supabase } = useSupabase();
    const router = useRouter();

    const signOut = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }
      alert(`Signed Out`);
      router.push("/");
    };

  return (
    <div className="flex justify-between items-center w-full md:hidden">
      <Link href="/" className="text-lg font-semibold text-slate-700">
        Ink Art
      </Link>

      <div className="flex space-x-4 items-center">
        <Link href="/cart" className="flex items-center spaxe-x-3">
          <ShoppingBag />
          Cart
        </Link>
        {user === null || !user ? (
          <Link href="/login" className="flex items-center spaxe-x-3">
            <User2Icon />
            Login
          </Link>
        ) : (
          <Button variant="destructive" onClick={signOut}>
            Logout
          </Button>
        )}
        <MenuIcon
          onClick={() => setOpen(!open)}
          className="w-6 h-6 text-slate-700"
        />

        <SlideOver open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};
export default MobileNavigation;
