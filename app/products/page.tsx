import Container from "@/components/layout/Container";
import ProductGrid from "@/components/products/ProductGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProducts } from "@/lib/fetchers/products";
import { Metadata } from "next";
import Link from "next/link";
import Pagination from "./Pagination";

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
  viewport: "width=device-width, initial-scale=1",
};

const page = async ({searchParams}:{searchParams: {page:string}}) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { current_page, data:products, last_page, links, per_page, total } = await getProducts(page, 24);

  return (
    <main className="mb-16">
      <Container>
        <div className="flex space-x-5">
          <section className="h-screen flex-1">
            <div className="mb-3">
              {" "}
              <Pagination
                currentPage={current_page}
                lastPage={last_page}
                total={total}
              />
            </div>

            <ScrollArea className="h-full w-full max-w-[1300px] overflow-hidden bg-slate-100 px-4 py-3">
              <ProductGrid products={products} />
            </ScrollArea>
          </section>
        </div>
      </Container>
    </main>
  );
};
export default page;
