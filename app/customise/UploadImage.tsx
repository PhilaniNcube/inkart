/* eslint-disable @next/next/no-img-element */
"use client"
import {ChangeEvent, useState} from "react"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSupabase } from "@/components/Providers/SupabaseProvider";
import { CanvasResponse } from "./page";
import { ScrollArea } from "@/components/ui/scroll-area";
import slugify from "slugify";

export type ImageUploadResponse = {
  file_name: string;
  height: number;
  id: string;
  mime_type: string;
  size: number;
  upload_time: string;
  preview_url: string;
  width: number;
}


const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter a title longer thatn 2 characters",
  }),
  // description: z.string().min(10, {message: "Please enter a description greater than 10 characters"}),
  size: z.string().min(3,{message: "Please select a size"}),

});

const UploadImage = ({ variants }: { variants: CanvasResponse }) => {
  const { supabase } = useSupabase();

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("");

  const [uploadResponse, setUploadResponse] =
    useState<null | ImageUploadResponse>(null);

     const form = useForm<z.infer<typeof FormSchema>>({
       resolver: zodResolver(FormSchema),
        defaultValues: {
          title: "",
          size: variants.variants[0].id.toString(),
        }
     });

       async function onSubmit(data: z.infer<typeof FormSchema>) {
         setLoading(true);
        //  console.log(data);

         if (typeof uploadResponse === "undefined" || !uploadResponse) {
           alert("Please upload an image");
           return;
         }

         //"print_areas.0.placeholders.0.images.0.id: The print_areas.0.placeholders.0.images.0.id field is required."

         console.log({title: data.title, variant: data.size, image_id: uploadResponse.id})

         const url = new URL(process.env.NEXT_PUBLIC_SITE_URL!);
         // create a product using the printify api
         const req = await fetch(`${url}/api/printify/products`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json;charset=utf-8",
           },
           body: JSON.stringify({
             title: data.title,
             variant_id: data.size,
             image_id: uploadResponse.id,
           }),
         })
           .then((res) => res.json())
           .catch((err) => console.log(err));

         const product = await req;
         setLoading(false);
         console.log(product);
       }

  // upload image to printify using the printify api
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = e.target.files;

    const file = files?.[0];

    if (!file) return;

    const filename =
      slugify(file.name.split(".")[0], {
        lower: true,
      }) + "_" + Math.ceil(Math.random() * 25);

    const fileExtension = file.name.split(".").pop();

    const uploadName = filename + "." + fileExtension;

    // console.log(uploadName)

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uploadName, file);

    if (error) {
      console.log(error);
      setLoading(false);
    }

    if (data) {
      // https://hdhqxisqffmoqhpzmhet.supabase.co/storage/v1/object/public/uploads/vehicles_4.jpg

      const url =
        "https://hdhqxisqffmoqhpzmhet.supabase.co/storage/v1/object/public/uploads/";
      // console.log(data);

      const prinify_upload: {data:ImageUploadResponse} = await fetch(
        `http://localhost:3000/api/printify/uploads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
          },
          body: JSON.stringify({
            file_name: uploadName,
            url: `${url}${data.path}`,
          }),
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      //"Failed to upload image. Cause: {"code":"error.file.wrong.format"}"

      setUploadResponse(prinify_upload.data);
      console.log({ prinify_upload });

      setImage(`${url}${data.path}`);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full max-w-sm items-start space-y-2">
          <Label htmlFor="image">Upload your image</Label>
          <div className="flex  w-full max-w-sm items-center space-x-2">
            <Input
              name="image"
              id="image"
              onChange={uploadImage}
              type="file"
              accept="image/*"
              placeholder="Upload Image"
            />
            {/* <Button type="submit">Upload</Button> */}
          </div>
          <div>
            {loading && <p>Uploading...</p>}
            {image && (
              <img
                src={image}
                alt="uploaded image"
                className="w-sm object-cover mt-3"
              />
            )}
          </div>
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    x
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size of canvas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-96">
                          {variants.variants.map((variant) => (
                            <SelectItem
                              key={variant.id}
                              value={variant.id.toString()}
                            >
                              {variant.title}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default UploadImage;

