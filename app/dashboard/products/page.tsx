import { getProducts } from "@/lib/fetchers/products";
import ProductsTable from "./ProductsTable";
import Pagination from "@/app/products/Pagination";
import TablePagination from "./TablePagination";

const page = async ({ searchParams }: { searchParams: { page: string } }) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const productsData = getProducts(page, 20);

  const [data] = await Promise.all([productsData]);

  return (
    <main>
      <TablePagination
        currentPage={data.current_page}
        lastPage={data.last_page}
        total={data.total}
      />
      <ProductsTable products={data.data} />
      <TablePagination
        currentPage={data.current_page}
        lastPage={data.last_page}
        total={data.total}
      />
    </main>
  );
};
export default page;
