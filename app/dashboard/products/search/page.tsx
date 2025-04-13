import { fetchAdminSearchProducts, fetchCategories } from "@/lib/fetchers/products";
import ProductsTable from "../ProductsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type PageProps = {
  searchParams: SearchParams;
}


const page = async (props: {
  searchParams: SearchParams
}) => {

  const searchParams = await props.searchParams;

  const page =  Number(searchParams.page) || 1;
  const page_size =  Number(searchParams.page_size) || 30;
  const query = searchParams.query as string || "" as string;

  const productsData = fetchAdminSearchProducts(page, page_size, query);

  const categoriesData = fetchCategories();

  const [{ products, count }, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  return (
    <div className="w-full">
      {products.length === 0 ? (
       <div className="flex justify-between items-center">
        <p className="text-xl font-medium">No products found</p>
        <Link href="/dashboard/products">
          <Button type="button">
            Go back
          </Button>
        </Link>
       </div>
      ) : (
        <ProductsTable products={products!} categories={categories} />
      )}
    </div>
  );
};
export default page;
