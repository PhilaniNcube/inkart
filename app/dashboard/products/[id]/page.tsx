import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { fetchCategories, fetchProductById, fetchProductCategories } from "@/lib/fetchers/products";
import Image from 'next/image'
import { SelectCategories } from "./SelectCategories";

const page = async ({params}:{params: Promise<{id:string}>}) => {

  const {id} = await params

  const productData =  fetchProductById(id)
  const categoriesData = fetchCategories()
  const productCategoryData = fetchProductCategories(id);

  const [product, categories, productCategories] = await Promise.all([
    productData,
    categoriesData,
    productCategoryData,
  ]);




  return (
    <div className="w-full px-4">
      <h1 className="text-3xl font-medium">{product.title}</h1>
      <Image
        src={product.images[0].src}
        width={500}
        height={500}
        alt={product.title}
        className="w-[250px] object-cover aspect-square"
      />

      <Separator className="my-4" />
      <SelectCategories
        categories={categories}
        productId={product.id}
        productCategories={productCategories}
      />
    </div>
  );
};
export default page;
