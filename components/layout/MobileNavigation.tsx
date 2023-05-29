"use client"

import { MenuIcon, MenuSquareIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SlideOver from "./SlideOver";

const MobileNavigation = () => {

  const [open, setOpen] = useState(false)

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
