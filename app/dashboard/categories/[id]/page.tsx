import { fetchProductsByCategoryId } from "@/lib/fetchers/products";
import TableComponent from "./Table";


const page = async ({params: {id}}:{params: {id:string}}) => {

  const productsData = await fetchProductsByCategoryId(id);

  const products = productsData.map((item) => {
    return item.product_id;
  })

  return (
    <div>
      <TableComponent products={products} />
    </div>
  );
};
export default page;
