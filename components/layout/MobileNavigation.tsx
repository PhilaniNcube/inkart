"use client";

import { MenuIcon, MenuSquareIcon, ShoppingBag, User2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SlideOver from "./SlideOver";
import { Button } from "../ui/button";
import { useSupabase } from "../Providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

type ComponentProps = {
  user: User | null;
};

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full md:hidden">
      <Link href="/" className="text-lg font-semibold text-slate-700">
        <Image
          src="/images/ink-art.webp"
          width={209}
          height={136}
          alt="Logo"
          className="object-cover w-16 h-16"
        />
      </Link>

      <div className="flex items-center space-x-4">
        <Link href="/cart" className="flex items-center spaxe-x-3">
          <ShoppingBag />
          Cart
        </Link>
        {/* {user === null || !user ? (
          <Link href="/login" className="flex items-center spaxe-x-3">
            <User2Icon />
            Login
          </Link>
        ) : (
          <Button variant="destructive" onClick={signOut}>
            Logout
          </Button>
        )} */}
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
