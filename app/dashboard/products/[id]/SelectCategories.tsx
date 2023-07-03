"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/types";
import { useSupabase } from "@/components/Providers/SupabaseProvider";
import { useRouter } from "next/navigation";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const FormSchema = z.object({
  categories: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type ComponentProps = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  productId: string;
  productCategories: Database["public"]["Tables"]["product_categories"]["Row"][];
};

export function SelectCategories({
  categories,
  productId,
  productCategories,
}: ComponentProps) {
  const { supabase } = useSupabase();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: productCategories.map((item) => item.category_id.id),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const uploadData = data.categories.map((item) => {
      return {
        product_id: productId,
        category_id: item,
      };
    });



    const { data: productCategories, error } = await supabase
      .from("product_categories")
      .upsert(uploadData)
      .select("*, product_id(*), category_id(*)");

    if (error) {
      throw new Error(error.message);
    }

    console.log({ productCategories });

    router.back();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>Select the categories</FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                                  ? field.onChange([...field.value, item.id])
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
