"use client"
import { useSupabase } from "@/components/Providers/SupabaseProvider";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";




const FeaturedSwitch = ({id, featured}: {id:string, featured:boolean}) => {

    const router = useRouter();
    const { supabase } = useSupabase();

   const updateProduct = async () => {
     const { data: product, error } = await supabase
       .from("products")
       .update({
         featured: !featured,
       })
       .eq("id", id)
       .select("*")
       .single();

     if (error) {
       throw new Error(error.message);
     }

     router.refresh();
   };

  return <Switch id="featured" checked={featured} onClick={() => {
    updateProduct();
    console.log("featured");
  }} />;
};
export default FeaturedSwitch;
