/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/lib/fetchers/orders";
import { formatPrice } from "@/lib/utils";

const page = async ({params}: {params: Promise<{id: string}>}) => {

  const paramsData = await params;
  const { id } = paramsData;


  const order = await getOrderById(id)

  return (
    <div className="w-full">
      <h1 className="text-2xl font-medium uppercase">
        {order.first_name} {order.last_name}
      </h1>
      <Separator className="my-3" />
      <div className="w-full">
        <p className="font-semibold">
          <Badge>{order.paid ? "Paid" : "Pending"}</Badge>
        </p>
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="w-full">
            <h2 className="text-xl font-semibold">Billing Details</h2>
            <p className="text-lg mt-2">Email: {order.email}</p>
            <p className="text-lg mt-2">Street Address: {order.address}</p>
            <p className="text-lg mt-2">City: {order.city}</p>
            <p className="text-lg mt-2">State: {order.state}</p>
            <p className="text-lg mt-2">Zip: {order.postal_code}</p>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-semibold">Order Items</h2>
            {order.order_items.map((item:any) => (
              <div key={item.variantSKU} className="flex w-full gap-4 my-2 bg-slate-100">
                <div className="flex items-center p-2 border border-slate-100 rounded-md overflow-clip"><img
                  src={item.image}
                  alt={item.productTitle}
                  className="w-24 h-24 object-cover"
                /></div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{item.productTitle}</p>
                  <p className="text-lg mt-2">
                    {item.qty} x {formatPrice(item.price)}
                  </p>
                  <p className="text-md">
                   Size: {item.size}
                  </p>
                </div>
              </div>
            ))}
            <Separator className="text-neutral-400" />
            <p className="text-md font-semibold">Subtotal: {formatPrice(order.subtotal)}</p>
            <p className="text-md font-semibold">Shipping: {formatPrice(order.shipping)}</p>
            <h2 className="text-2xl font-semibold mt-3">Total: {formatPrice(order.total)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
