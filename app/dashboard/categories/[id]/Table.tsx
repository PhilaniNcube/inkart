"use client";

import { Product, ProductGridItem } from "@/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { revalidatePath } from "next/cache";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Database } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FeaturedSwitch from "../../products/FeaturedSwitch";


type ProductsTableProps = {
  products: Database["public"]["Tables"]["products"]["Row"][];
  // categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const TableComponent = ({ products }: ProductsTableProps) => {
  // const toggleLock = async (product:ProductGridItem) => {

  //  const res = await fetch(`/api/products/${product.id}/publish`, {
  //     next:{tags: ["products", "/dashboard/products"]},
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       cache: "no-cache",
  //     },
  //     body: JSON.stringify({ product }),
  //  })

  //  const data = await res.json()

  // }

  return (
    <Table>
      <TableCaption>Products</TableCaption>
      <TableHeader>
        <TableRow className="font-medium text-lg">
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          {/* <TableCell>Category</TableCell> */}
          <TableCell>Price</TableCell>
          <TableCell>Cost</TableCell>
          <TableCell>Featured</TableCell>
          <TableCell>View</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Image
                src={product.images[0].src}
                width={80}
                height={80}
                alt={product.title}
                className="w-16 object-cover aspect-square"
              />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            {/* <TableCell className="flex flex-col items-center space-y-2">
              <p className="font-medium text-xs">
                {product.category?.title ? (
                  product.category?.title
                ) : (
                  <span className="text-red-500">Choose a category</span>
                )}
              </p>
              <EditProductCategory id={product.id} categories={categories} />
            </TableCell> */}
            <TableCell>{formatPrice(product.variants[0].price)}</TableCell>
            <TableCell>{formatPrice(product.variants[0].cost)}</TableCell>

            <TableCell>
              <FeaturedSwitch featured={product.featured} id={product.id} />
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/products/${product.id}`}>
                <Button
                  variant="default"
                  type="button"
                  className="flex gap-2 items-center bg-zinc-800"
                >
                  <EyeIcon type="outline" size={20} />
                  Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableComponent;
