"use client"

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
import Image from "next/image"
import { Database } from "@/types";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProductsTableProps = {
  products: Database['public']['Tables']['products']['Row'][];
};

const ProductsTable = ({products}:ProductsTableProps) => {

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
          <TableCell>Category</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Cost</TableCell>
          <TableCell>Published</TableCell>
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
            <TableCell>
              {product.category?.title
                ? product.category?.title
                : "Missing Category"}
            </TableCell>
            <TableCell>{formatPrice(product.variants[0].price)}</TableCell>
            <TableCell>{formatPrice(product.variants[0].cost)}</TableCell>


            <TableCell>
              {product.is_locked ? (
                <Badge className="bg-green-600 text-white">Published</Badge>
              ) : (
                <Badge>Locked</Badge>
              )}
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/products/${product.id}`}>
                <Button variant="outline" type="button">
                  <EyeIcon type="outline" size={20} />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ProductsTable;
