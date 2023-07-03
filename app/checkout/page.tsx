import Container from "@/components/layout/Container";
import CheckoutDetails from "./CheckoutDetails";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { getOrderById } from "@/lib/fetchers/orders";
import { getExchangeRate } from "@/lib/utils";

const page = async ({ searchParams }: { searchParams: {order_id:string|undefined} }) => {


  const {order_id} =  searchParams
  const exchangeRate = await getExchangeRate()

const order = await getOrderById(order_id!)

  return (
    <main>
      {/* <pre>{JSON.stringify(exchangeRate.quotes.USDZAR, null, 2)}</pre> */}
      <CheckoutDetails  order={order} />
    </main>
  );
};
export default page;
