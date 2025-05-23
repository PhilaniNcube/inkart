import Container from "@/components/layout/Container";
import ProductGrid from "@/components/products/ProductGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchProducts, getProducts } from "@/lib/fetchers/products";
import { Metadata } from "next";
import Link from "next/link";
import Pagination from "./Pagination";
import Grid from "@/components/products/Grid";

export const metadata: Metadata = {
  title: "Stunning Wall Art & Home Decor | InkArt",
  description:
    "Discover our unique collection of beautiful, high-quality wall art and home decor. Perfect for adding a touch of style and personality to any room!",
  keywords: [
    "wall art, home decor, canvas prints, framed art, modern art, photography, paintings, posters, metal wall art, sculptures",
  ],
  openGraph: {
    title: "Stunning Wall Art & Home Decor | InkArt",
    description:
      "Discover our unique collection of beautiful, high-quality wall art and home decor. Perfect for adding a touch of style and personality to any room!",
  },

};

type SearchParams = Promise<{ [key: string]: string | undefined }>

const page = async (props: {

  searchParams: SearchParams
}) => {

  const searchParams = await props.searchParams;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, count } = await fetchProducts(page, 24);

  const lastPage = Math.ceil(count! / 24);

  return (
    <main className="mb-16">
      <Container>
        <div className="flex space-x-5">
          <section className="h-screen flex-1">
            <div className="mb-3">
              {" "}
              <Pagination
                currentPage={page}
                lastPage={lastPage}
                total={count!}
              />
            </div>

            <ScrollArea className="h-full w-full max-w-[1300px] overflow-hidden px-4 py-3">
              <Grid products={products!} />
            </ScrollArea>
          </section>
        </div>
      </Container>
    </main>
  );
};
export default page;
