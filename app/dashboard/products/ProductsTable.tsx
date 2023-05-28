"use client"

import { Product } from "@/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { revalidatePath } from "next/cache";
import { formatPrice } from "@/lib/utils";
import Image from "next/image"

type ProductsTableProps = {
  products: Product[];
}

const ProductsTable = ({products}:ProductsTableProps) => {

  const toggleLock = async (product:Product) => {
    console.log(product)

   const res = await fetch(`/api/products/${product.id}/publish`, {
      next:{tags: ["products", "/dashboard/products"]},
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cache: "no-cache",
      },
      body: JSON.stringify({ product }),
   })

   const data = await res.json()



  console.log({data})

  }

  return (
    <Table>
      <TableCaption>Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Cost</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Image src={product.images[0].src} width={100} height={100} alt={product.title} className="w-16 object-cover aspect-square"/>
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>
              <Switch checked={!product.is_locked} onClick={() => toggleLock(product)} />
            </TableCell>
            <TableCell>{formatPrice(product.variants[0].price)}</TableCell>
            <TableCell>{formatPrice(product.variants[0].cost)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ProductsTable;
