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

type ProductsTableProps = {
  products: Product[];
}

const ProductsTable = ({products}:ProductsTableProps) => {

  const toggleLock = async (product:Product) => {
    console.log(product)
    if(product.is_locked === true) {
     const response = await fetch(
       `https://api.ptintify.com/v1/9354978/products/${product.id}/publishing_succeeded.json`,
       {
         method: "POST",
         headers: {
           cache: "no-cache",
           "Content-Type": "application/json;charset=utf-8",
           Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
         },
       }
     ).then((res) => res.json());


       console.log(response)
    } else {
      const response = await fetch(
        `https://api.ptintify.com/v1/9354978/products/${product.id}/unpublish.json`,

        {
          cache: "no-cache",
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
          },
          body: JSON.stringify({
            title: true,
            description: true,
            images: true,
            variants: true,
            tags: true,
            keyFeatures: true,
            shipping_template: true,
          }),
        }
      ).then((res) => res.json());

       console.log(response);
    }

    revalidatePath(`/dashboard/products`)
    revalidatePath(`/products`)
    revalidatePath(`/products/${product.id}`)
  }

  return (
    <Table>
      <TableCaption>Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Cost</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>
              <Switch checked={!product.is_locked} onClick={() => toggleLock(product)} />
            </TableCell>
            <TableCell>{product.variants[0].price}</TableCell>
            <TableCell>{product.variants[0].cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ProductsTable;
