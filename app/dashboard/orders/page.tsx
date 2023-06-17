import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/lib/fetchers/orders";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const page = async ({searchParams: {page}}:{searchParams: {page: string}}) => {

  const currentPage = +page || 1

  const page_size = 8

  const {count, orders} = await getOrders(page_size, currentPage)
  console.log(orders)

  const max_page = Math.ceil(count! / page_size)

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Separator className="my-4" />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <Link
            href={{
              pathname: "/dashboard/orders",
              query: {
                page: currentPage === 1 ? 1 : currentPage - 1,
              },
            }}
          >
            <Button type="button">Prev</Button>
          </Link>

          <p className="text-slate-500 font-medium text-md">
            Page {` ${currentPage} of ${max_page} pages`}{" "}
          </p>

          <Link
            href={{
              pathname: "/dashboard/orders",
              query: {
                page: currentPage === max_page ? max_page : currentPage + 1,
              },
            }}
          >
            <Button type="button">Next</Button>
          </Link>
        </div>
        <Separator className="my-4" />
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow className="font-bold text-md ">
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Order Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow className="font-medium text-sm" key={order.id}>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>
                    {order.first_name} {order.last_name}
                  </TableCell>
                  <TableCell>
                    {order.phone}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.created_at), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>
                    {order.paid === true ? (
                      <Badge className="text-xs bg-green-500 text-white">
                        Paid
                      </Badge>
                    ) : (
                      <Badge className="text-xs text-white">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/dashboard/orders/${order.id}`,
                      }}
                    >
                      <Button type="button">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default page;
