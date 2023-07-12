import Container from "@/components/layout/Container";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Boxes, ShirtIcon, Truck, Users } from "lucide-react";
import { StackIcon } from "@radix-ui/react-icons";

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="h-screen w-full flex space-x-2 items-start">
        <div className="h-full">
          <ScrollArea className="w-56">
            <div className="h-screen flex flex-col bg-slate-100 px-4 py-3">
              <Image src="/images/ink_logo.jpeg" width={500} height={500} alt="Logo" className="h-16 w-16 object-cover" />
              <Separator className="my-2" />
              <Link href="/dashboard/products" className="flex items-center px-3 py-1 rounded-lg hover:bg-slate-400 space-x-2">
                <Boxes className="h-6 w-6" />
                <span>Products</span>
              </Link>
              <Link href="/dashboard/categories" className="flex items-center px-3 py-1 mt-3 rounded-lg hover:bg-slate-400 space-x-2">
                <StackIcon className="h-6 w-6" />
                <span>Categories</span>
              </Link>
              <Link href="/dashboard/orders" className="flex items-center px-3 py-1 mt-3 rounded-lg hover:bg-slate-400 space-x-2">
                <Truck className="h-6 w-6" />
                <span>Orders</span>
              </Link>
              <Link href="/dashboard/customers" className="flex items-center px-3 py-1 mt-3 rounded-lg hover:bg-slate-400 space-x-2">
                <Users className="h-6 w-6" />
                <span>Customers</span>
              </Link>
              <Link href="/dashboard/printify" className="flex items-center px-3 py-1 mt-3 rounded-lg hover:bg-slate-400 space-x-2">
                <ShirtIcon className="h-6 w-6" />
                <span>Printify</span>
              </Link>
            </div>
          </ScrollArea>
        </div>
        <div className="h-screen flex-1">
          <ScrollArea className="w-full h-full overflow-hidden px-4 py-3">
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
export default layout;
