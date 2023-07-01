import { getOrderById } from "@/lib/fetchers/orders";

const page = async ({params: {id}}: {params: {id: string}}) => {

  console.log(id);

  const order = await getOrderById(id)

  return <div className="w-full">
    <h1 className="text-2xl font-medium">Order: {id.split('-')[0]}</h1>
  </div>;
};
export default page;
