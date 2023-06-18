import { fetchCategories, fetchProducts, getProducts } from "@/lib/fetchers/products";
import ProductsTable from "./ProductsTable";
import Pagination from "@/app/products/Pagination";
import TablePagination from "./TablePagination";

export const revalidate = 0;

async function page({ searchParams }: { searchParams: { page: string; }; }) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const productsData = fetchProducts(page, 24);
  const categoriesData = fetchCategories();



  const [{ products, count }, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  const lastPage = Math.ceil(count! / 24)

  return (
    <main>
      <TablePagination
        currentPage={page}
        lastPage={lastPage}
        total={count!}
      />
      <ProductsTable products={products!} categories={categories} />
      <TablePagination
        currentPage={page}
        lastPage={lastPage}
        total={count!}
      />
    </main>
  );
}
export default page;
