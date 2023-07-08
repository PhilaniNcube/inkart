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
import { Database } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

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
  categories: z.array(z.string())

});

type Props = {
  variants: Database["public"]["Tables"]["canvas_variants"]["Row"][];
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const UploadImage = ({ variants, categories }: Props) => {
  const { supabase } = useSupabase();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [productCreated, setProductCreated] = useState(false);

  const [image, setImage] = useState("");

  const [productUpdated, setProductUpdated] = useState<null | Database["public"]["Tables"]["products"]["Row"]>(null)

  const [printifyProduct, setPrintifyProduct] = useState<null | any>(null);

  const [uploadResponse, setUploadResponse] =
    useState<null | ImageUploadResponse>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      size: variants[0].id.toString(),
      categories: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    //  console.log(data);

    if (typeof uploadResponse === "undefined" || !uploadResponse) {
      alert("Please upload an image");
      return;
    }

    //"print_areas.0.placeholders.0.images.0.id: The print_areas.0.placeholders.0.images.0.id field is required."

    console.log({
      title: data.title,
      variant: data.size,
      image_id: uploadResponse.id,
      categories: data.categories,
    });

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
        categories: data.categories,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    const res = await req;
    setLoading(false);

    console.log(res);

    if(res.product?.id) {

      // const productImage = res.product.images.filter((image:{is_default:boolean, is_selected_for_publishing:boolean, position: string, src: string, variant_id: number, variant_ids: number[]}) => image.src.includes("context-1"))
      setProductCreated(true);
      setProductUpdated(res.product);
      // router.push(`/products/${res.product.id}`)
    }
    // setPrintifyProduct(product);
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
      }) +
      "_" +
      Math.ceil(Math.random() * 25);

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

      const printify_uplaod: { data: ImageUploadResponse } = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/printify/uploads`,
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

      if(!printify_uplaod?.data.id) {
        alert("Failed to upload image. Please try again");
        console.log(printify_uplaod);
        setLoading(false);
        return;
      }

      setUploadResponse(printify_uplaod.data);
      console.log({ printify_uplaod });

      setImage(`${url}${data.path}`);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row  md:gap-x-6 md:items-start justify-between">
        <div className="flex flex-col w-full max-w-xl items-start space-y-2">
          <Label htmlFor="image">Upload your image</Label>
          <div className="flex  w-full  items-center space-x-2">
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
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-2"
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
                            {variants.map((variant) => (
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
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Categories</FormLabel>
                        <FormDescription>Select the categories</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        {" "}
                        {categories.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              // ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.title}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>

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

        <div>
          {loading && <p>Uploading...</p>}
          {image && !productCreated && (
            <img
              src={image}
              alt="uploaded image"
              className="w-sm object-cover mt-3"
            />
          )}
          {productCreated && (
            <div className="w-full grid grid-cols-2 gap-4">
              <img
                src={productUpdated?.images[1].src}
                alt="uploaded image"
                className="w-full aspect-square object-cover mt-3"
              />
              <img
                src={productUpdated?.images[4].src}
                alt="uploaded image"
                className="w-full aspect-square object-cover mt-3"
              />
              <img
                src={productUpdated?.images[5].src}
                alt="uploaded image"
                className="w-full aspect-square object-cover mt-3"
              />
              <img
                src={productUpdated?.images[7].src}
                alt="uploaded image"
                className="w-full aspect-square object-cover mt-3"
              />
            </div>
          )}
        </div>
      </div>{" "}
      {/* {printifyProduct && <pre>{JSON.stringify(printifyProduct, null, 2)}</pre>} */}
    </div>
  );
};
export default UploadImage;

