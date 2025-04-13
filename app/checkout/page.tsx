
import CheckoutDetails from "./CheckoutDetails";
import { getOrderById } from "@/lib/fetchers/orders";


const page = async ({ searchParams }: { searchParams: Promise<{order_id:string|undefined}> }) => {


  const {order_id} =  await searchParams


const order = await getOrderById(order_id!)

  return (
    <main>
      {/* <pre>{JSON.stringify(exchangeRate.quotes.USDZAR, null, 2)}</pre> */}
      <CheckoutDetails  order={order} />
    </main>
  );
};
export default page;
