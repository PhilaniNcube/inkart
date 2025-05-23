import Container from "@/components/layout/Container";
import { Separator } from "@/components/ui/separator";
import { getOrderById, updateOrderById } from "@/lib/fetchers/orders";
import { formatPrice } from "@/lib/utils";
import analytics from "@/utils/analytics";
import Image from "next/image";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ order_id: string | undefined }>;
}) => {

  const { order_id } = await searchParams;

  const order = await getOrderById(order_id!);
  const updatedOrder = await updateOrderById(order_id!);

  if(order.paid === false) {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: order.email,
      order_id: order.id,
      first_name: order.first_name,
      last_name: order.last_name,
      address: order.address,
      city: order.city,
      state: order.state,
    }),
  })
    .then((response) => response.text())
    .catch((error) => console.error("Error sending email", error));
  }


  if (updatedOrder?.paid === true) {
       analytics.track("purchase", {
        transaction_id: updatedOrder.id,
        currency: "USD",
         value: updatedOrder.subtotal/100,
         shipping: updatedOrder.shipping/100,
         items: updatedOrder.order_items.map((item:any) => ({
           item_id: item.variantSKU,
           item_name: item.productTitle,
           affiliation: "Ink Art",
           price: item.price,
           quantity: item.qty,
         })),
       });
  }
    // console.log(email)

    // console.log({ updatedOrder });

    // const query = await fetch(
    //   `https://sandbox.payfast.co.za/​eng/query/validate`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ item_name: order_id })
    //   }
    // ).then((response) => response.json()).catch((error) => console.error(error));

    // console.log(query);

    return (
      <main>
        <Container>
          <h1 className="text-3xl md:text-4xl">
            Thank You for your order {order.first_name}.
          </h1>
          <p className="text-md max-w-[50ch]">
            Your order number is being printed and we aim to get it delivered in
            the next 3 to 6 working days. We will keep you posted.
          </p>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 max-w-[700px]">
            {order.order_items.map((item:any) => (
              <div
                key={item.variantSKU}
                className="w-full flex space-x-3 border-b"
              >
                <Image
                  src={item.image}
                  width={400}
                  height={400}
                  className="w-[200px] object-cover aspect-square"
                  alt={item.size}
                />
                <div className="mt-2 w-full px-2">
                  <h2 className="text-xl font-semibold">{item.productTitle}</h2>
                  <h2 className="text-md font-semibold text-slate-400">
                    {item.size}
                  </h2>
                  <h2 className="text-lg font-semibold text-slate-400">
                    {formatPrice(item.price)} x {item.qty}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
    );
};
export default page;
