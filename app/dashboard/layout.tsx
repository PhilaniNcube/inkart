import Container from "@/components/layout/Container";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Boxes, ShirtIcon, Truck, Users } from "lucide-react";
import { StackIcon } from "@radix-ui/react-icons";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-start w-full h-screen space-x-2">
        <div className="h-full">
          <ScrollArea className="w-56">
            <div className="flex flex-col h-screen px-4 py-3 bg-slate-100">
              <Image
                src="/images/ink-art.webp"
                width={209}
                height={136}
                alt="Logo"
                className="object-cover w-16 h-16"
              />
              <Separator className="my-2" />
              <Link
                href="/dashboard/products"
                className="flex items-center px-3 py-1 space-x-2 rounded-lg hover:bg-slate-400"
              >
                <Boxes className="w-6 h-6" />
                <span>Products</span>
              </Link>
              <Link
                href="/dashboard/categories"
                className="flex items-center px-3 py-1 mt-3 space-x-2 rounded-lg hover:bg-slate-400"
              >
                <StackIcon className="w-6 h-6" />
                <span>Categories</span>
              </Link>
              <Link
                href="/dashboard/orders"
                className="flex items-center px-3 py-1 mt-3 space-x-2 rounded-lg hover:bg-slate-400"
              >
                <Truck className="w-6 h-6" />
                <span>Orders</span>
              </Link>
              <Link
                href="/dashboard/customers"
                className="flex items-center px-3 py-1 mt-3 space-x-2 rounded-lg hover:bg-slate-400"
              >
                <Users className="w-6 h-6" />
                <span>Customers</span>
              </Link>
              <Link
                href="/dashboard/printify"
                className="flex items-center px-3 py-1 mt-3 space-x-2 rounded-lg hover:bg-slate-400"
              >
                <ShirtIcon className="w-6 h-6" />
                <span>Printify</span>
              </Link>
            </div>
          </ScrollArea>
        </div>
        <div className="flex-1 h-screen">
          <ScrollArea className="w-full h-full px-4 py-3 overflow-hidden">
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
export default layout;
