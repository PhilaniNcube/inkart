import { fetchCategories, fetchProducts, getProducts } from "@/lib/fetchers/products";
import ProductsTable from "./ProductsTable";
import Pagination from "@/app/products/Pagination";
import TablePagination from "./TablePagination";
import SearchProducts from "./SearchProducts";

export const revalidate = 0;

type SearchParams = Promise<{ [key: string]: string | undefined }>

async function page(props: {
  searchParams: SearchParams
}) {

  const searchParams = await props.searchParams;

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
      <SearchProducts />
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
