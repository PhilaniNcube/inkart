"use client"
import {useRouter} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSupabase } from "@/components/Providers/SupabaseProvider";
import { Database } from "@/types";
import { Button } from "@/components/ui/button";

type ComponentProps = {
  id: string;
  categories: Database['public']['Tables']['categories']['Row'][]
}

const EditProductCategory = ({id, categories}:ComponentProps) => {

  const router = useRouter()
  const {supabase} = useSupabase()

 const updateProduct = async (categoryId:string) => {

    const { data: product, error } = await supabase
      .from("products")
      .update({
        category: categoryId,
      })
      .eq("id", id)
      .select("*").single();

    if (error) {
      throw new Error(error.message)
    }

    router.refresh()

 }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button" variant="outline" className="text-xs">Edit Category</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => updateProduct(category.id)}
          >
            {category.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default EditProductCategory;
