import Container from "@/components/layout/Container";
import ProductGrid from "@/components/products/ProductGrid";
import { Separator } from "@/components/ui/separator";
import { fetchCategoryById, fetchProductsFormCategoryId } from "@/lib/fetchers/products";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {

  const { id } = await params;

  const category = await fetchCategoryById(id);

  return {
    title: `${category.title} | Ink Art`,
    description: `Browse our ${category.title} category for the best wall art you can find online.`,
  };
}

const page = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page: string }> }) => {

  const { id } = await params;
  const { page } = await searchParams;

  const categoryData = fetchCategoryById(id)
  const productsData = fetchProductsFormCategoryId(id);

  const [category, products] = await Promise.all([categoryData, productsData])



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
