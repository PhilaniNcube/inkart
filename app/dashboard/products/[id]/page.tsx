import { fetchCategories, fetchProductById } from "@/lib/fetchers/products";

const page = async ({params: {id}}:{params: {id:string}}) => {

  const productData =  fetchProductById(id)
  const categoriesData = fetchCategories()

  const [product, categories] = await Promise.all([productData, categoriesData])

  return <div className="w-full px-4">
    <h1 className="text-3xl font-medium">{product.title}</h1>
  </div>;
};
export default page;
