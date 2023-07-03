import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { fetchCategories, fetchProductById, fetchProductCategories } from "@/lib/fetchers/products";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import Image from 'next/image'
import { Database } from "@/types";
import { SelectCategories } from "./SelectCategories";

const page = async ({params: {id}}:{params: {id:string}}) => {

  const productData =  fetchProductById(id)
  const categoriesData = fetchCategories()
  const productCategoryData = fetchProductCategories(id);

  const [product, categories, productCategories] = await Promise.all([
    productData,
    categoriesData,
    productCategoryData,
  ]);

  const updateProduct = async (data:FormData) => {
    "use server"

    const category = data.get("category")
    const is_locked = data.get("is_locked")
    const supabase = createServerActionClient<Database>({ cookies });
    // console.log({ category, is_locked})

    if (typeof category !== "string") {
      throw new Error("category must be a string")
    }

     const { data: product, error } = await supabase
       .from("products")
       .update({
         category: category,
         is_locked: is_locked === "on" ? true : true,
       })
       .eq("id", id)
       .select("id, category, is_locked");

    console.log({product, error})

    if (error) {
      throw new Error(error.message)
    }
     revalidatePath(`/dashboard/products/${id}`);
    return product

    }


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
      {/* <form action={updateProduct} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2 w-full"></div>
          <div className="flex justify-end items-center space-x-2 w-full">
            <Switch
              id="is_locked"
              name="is_locked"
              defaultChecked={product.is_locked}
            />
            <Label htmlFor="is_locked">Is Product Locked?</Label>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="">
          <Button type="submit">Save</Button>
        </div>
      </form> */}
    </div>
  );
};
export default page;
