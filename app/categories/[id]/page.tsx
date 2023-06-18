import Container from "@/components/layout/Container";
import ProductGrid from "@/components/products/ProductGrid";
import { Separator } from "@/components/ui/separator";
import { fetchCategoryById,  fetchProductsByCategoryId } from "@/lib/fetchers/products";
import { Metadata } from "next";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const category = await fetchCategoryById(id);

  return {
    title: `${category.title} | Ink Art`,
    description: `Browse our ${category.title} category for the best wall art you can find online.`,
  };
}

const page = async ({params: {id}, searchParams: {page}}:{params: {id: string}, searchParams: {page:string}}) => {


  const currentPage = page ? +page : 1;

  const categoryData =  fetchCategoryById(id)
  const productsData = fetchProductsByCategoryId( id);

  const [category, {products, count}] = await Promise.all([categoryData, productsData])



  return <div>
    <Container>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">{category.title}</h1>
    </Container>
      {products.length === 0 ? (
        <Container>
          <Separator className="mb-4" />
          <h2 className="text-xl font-medium">No products found in this category at the moment. Please browse another category</h2>
        </Container>
      ) : <ProductGrid products={products} />}

  </div>;
};
export default page;
