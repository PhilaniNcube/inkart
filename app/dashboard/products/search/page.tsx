import { fetchAdminSearchProducts, fetchCategories } from "@/lib/fetchers/products";
import ProductsTable from "../ProductsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {
  searchParams: {
    page?: string;
    page_size?: string;
    query?: string;
  };
}


const page = async ({ searchParams }: PageProps) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const page_size = searchParams.page_size ? parseInt(searchParams.page_size) : 30;
  const query = searchParams.query ? searchParams.query : "";

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
