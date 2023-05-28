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

   const res = await fetch(`/api/products/${product.id}/publish`, {
      method: "POST",
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
