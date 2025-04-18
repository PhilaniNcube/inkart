import { Separator } from "@/components/ui/separator";
import UploadImage from "./UploadImage";
import { cookies } from "next/headers";
import { Database } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/fetchers/products";
import { createClient } from "@/utils/supabase/server";

export type CanvasResponse = {
  id: number;
  title: string;
  variants: {
    id: number;
    title: string;
    options: {
      size: string;
      depth: string;
    };
    placeholders: {
      position: string;
      height: number;
      width: number;
    }[]
  }[]
}


const page = async () => {

   const supabase = await createClient()

   const sessionData = await supabase.auth.getSession();

   console.log("Getting user", sessionData);

  // const url = new URL(
  //   `http://localhost:3000/api/printify/blueprints/50/variants`
  // );

  // const cnavas_sizes = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
  // }).then(response => response.json()).catch(error => console.log(error));

  // const { data }: { data: CanvasResponse } = await cnavas_sizes;

  const {data: canvas_sizes, error: canvas_sizes_error} = await supabase.from("canvas_variants").select("*");

   const categories = await fetchCategories();

   console.log(sessionData)

  return (
    <div className="my-10 container">
      <h1 className="text-3xl font-bold">Custom Canvas</h1>
      <p className="text-md">Create your own wall art with your own image</p>
      <Separator className="my-4" />

      {sessionData.data.session ? (
        <UploadImage variants={canvas_sizes!} categories={categories} />
      ) : (
        <Link href="/login">
          <Button>Please log in</Button>
        </Link>
      )}
    </div>
  );
};
export default page;
