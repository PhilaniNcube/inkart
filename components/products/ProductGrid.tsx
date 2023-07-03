"use client"

/* eslint-disable @next/next/no-img-element */
import { ProductGridItem } from "@/schema";
import Link from "next/link";
import Image from 'next/image'
import Container from "../layout/Container";
import { Database } from "@/types";
import ProductImage from "./ProductImage";

type PageProps = {
  products: Database['public']['Tables']['product_categories']['Row'][];
}

const ProductGrid = ({products}:PageProps) => {

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {



           const contextImage = product.product_id.images.find(image => image.src.includes('context'));

          //  console.log({contextImage})


          return (
            <article
              key={product.product_id.id}
              className="group w-full group-hover:shadow-md rounded-md"
            >
              <Link
                href={`/products/${product.product_id.id}`}
                className="w-full flex items-center justify-center relative"
              >
                {/* <div
                  onMouseEnter={() => console.log("mouse enter")}
                  onMouseLeave={() => console.log("mouse leave")}
                  className="realtive isolate w-full aspect-square overflow-clip"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="object-cover w-full absolute inset-0"
                  />
                </div> */}
                <ProductImage
                  images={product.product_id.images}
                  title={product.product_id.title}
                />
              </Link>
              <div className="flex items-start">
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {product.product_id.title}
                </p>
                {/* <p className="mt-3 text-sm font-semibold text-slate-700 w-[30%] text-right">
                From {formatPrice(product.variants[0].price)}
              </p> */}
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
};
export default ProductGrid;
