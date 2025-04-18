import Container from "@/components/layout/Container";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchSearchProducts } from "@/lib/fetchers/products";
import { Metadata } from "next";
import Link from "next/link";
import Pagination from "../Pagination";
import { Button } from "@/components/ui/button";
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

  const query = searchParams.query ? searchParams.query : '';

  // const {
  //   current_page,
  //   data: products,
  //   last_page,
  //   links,
  //   per_page,
  //   total,
  // } = await getProducts(page, 10);


 const {products, count} = await fetchSearchProducts(query);


  return (
    <main>
      <Container>
        <div className="flex space-x-5">
          <section className="h-screen flex-1">
            <div className="mb-3">
              {" "}
              {/* <Pagination
                currentPage={current_page}
                lastPage={last_page}
                total={total}
              /> */}
            </div>

            <ScrollArea className="h-full w-full max-w-[1300px] overflow-hidden px-4 py-3">
              {products.length === 0 ? (
                <div className="">
                  <p className="text-md font-medium text-slate-600">{`The search term "${query}" did not return any results.`}</p>
                  <Link href="/products?page=1">
                    <Button>Back to products</Button>
                  </Link>
                </div>
              ) : (
                <Grid products={products} />
              )}
            </ScrollArea>
          </section>
        </div>
      </Container>
    </main>
  );
};
export default page;
