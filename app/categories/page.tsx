import Container from "@/components/layout/Container";
import { fetchCategories } from "@/lib/fetchers/products";
import ShopByCategories from "../ShopByCategories";


const page = async () => {
  const categories = await fetchCategories();

  return (
    <Container>
      <ShopByCategories categories={categories} />
    </Container>
  );
};
export default page;
