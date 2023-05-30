"use client"
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Product, ProductVariations } from "@/schema";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";

type ProductDetailProps = {
  product: Product;
}

const ProductDetail = ({product}:ProductDetailProps) => {

  console.log( product)

  const [selectedVariation, setSelectedVariation] = useState<Product['variants'][0]>(product.variants[0])

  console.log( {selectedVariation})

  const imageObject = product.images.find(el => el.variant_ids.filter(id => id === selectedVariation.id))

  // console.log( {imageObject} );




  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 ">
        <div className="w-full flex space-x-3 ">
          <div className="flex-1 flex flex-col">
            <div className="">
              <Image
                src={imageObject?.src!}
                width={500}
                height={500}
                alt={product.title}
                className="w-full object-cover aspect-square group-hover:opacity-75"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-700">
            {product.title}
          </h1>
          <Separator className="my-3" />
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <Separator className="my-3" />

          <div className="flex justify-between items-center gap-5">
            <Select >
              <SelectTrigger className="w-full text-xs">
                <SelectValue placeholder="Select a canvas size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Canvas Size</SelectLabel>
                  {product.variants.map((variant, idx) => (
                    <SelectItem
                      value={JSON.stringify(variant)}
                      key={variant.id}
                      onClick={(e) => setSelectedVariation(variant)}
                    >
                      {variant.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <h3 className="font-semibold text-2xl text-neutral-500 w-1/2">{formatPrice(selectedVariation.price)}</h3>
          </div>
        </div>
      </div>
      <div className="mt-10"></div>
    </Container>
  );
};
export default ProductDetail;
