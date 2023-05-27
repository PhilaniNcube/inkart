import { ShoppingCartIcon, User2Icon, UserPlus2Icon } from "lucide-react";
import Link from "next/link";

const DesktopNavigation = () => {
  return (
    <div className="w-full">
      <div className="w-full md:flex justify-between items-center space-x-8 hidden">
        <div>
          <Link href="/" className="text-slate-800 font-semibold text-lg">
            Ink Art
          </Link>
        </div>{" "}
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="Search for products"
          />
        </div>
        <div className="flex space-x-5 items-center">
          <Link href="/cart" className="flex flex-col items-center">
            <ShoppingCartIcon size={20} strokeWidth={1} />
            <span className="text-xs text-slate-800 font-semibold">Cart</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center">
            <User2Icon size={20} strokeWidth={1} />
            <span className="text-xs text-slate-800 font-semibold">Login</span>
          </Link>
          <Link href="/register" className="flex flex-col items-center">
            <UserPlus2Icon size={20} strokeWidth={1} />
            <span className="text-xs text-slate-800 font-semibold">
              Register
            </span>
          </Link>
        </div>
      </div>
      <div className="w-full pt-3 flex items-center justify-center space-x-4">
        <Link href="/products?page=1" className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md">
          Browse Products
        </Link>
        <Link href="/products/best-sellers" className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md">
         Best Sellers
        </Link>
        <Link href="/accessories" className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md">
         Accessories
        </Link>
        <Link href="/terms-and-conditions" className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md">
         Terms and Conditions
        </Link>
        <Link href="/about-us" className="text-slate-800 hover:text-slate-700 text-sm px-2 py-1 hover:bg-slate-200 rounded-md">
         About Us
        </Link>
      </div>
    </div>
  );
};
export default DesktopNavigation;
