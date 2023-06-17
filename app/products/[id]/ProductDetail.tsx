/* eslint-disable @next/next/no-img-element */
"use client"
import { increment } from "@/app/store/features/cartSlice";
import { useAppDispatch } from "@/app/store/store";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Product, ProductVariations } from "@/schema";
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

type ProductDetailProps = {
  product: Product;
}

const ProductDetail = ({product}:ProductDetailProps) => {

  const router = useRouter()

  const [imgIndex, setImgIndex] = useState(0)


  const [selectedVariation, setSelectedVariation] = useState(
    product.variants[imgIndex]
  );


  const imageIndex = product.images.filter((img) => img.variant_ids.includes(selectedVariation.id))

  const dispatch = useAppDispatch()






  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 ">
        <div className="w-full flex-col flex space-x-3 ">
          <div className="flex-1 flex flex-col">
            <div className="">
              <Image
                src={imageIndex[imgIndex].src}
                width={500}
                height={500}
                alt={product.title}
                className="w-full object-cover aspect-square group-hover:opacity-75"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-wrap mt-4">
              {imageIndex.map((img, idx) => {
                return (
                  <Image
                    width={100}
                    height={100}
                    onClick={() => {
                      setImgIndex(idx);
                    }}
                    key={idx}
                    src={img.src}
                    className="w-full object-cover aspect-square p-1 border border-slate-100 cursor-pointer"
                    alt="Product Image"
                  />
                );
              })}
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

          <div className="grid grid-cols-2 gap-5">
            {product.variants.map((variant, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVariation(variant)}
                className={`w-full border border-slate-300  rounded-md p-3 flex flex-col cursor-pointer ${
                  selectedVariation.id === variant.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <p className="text-xs">Size: {variant.title}</p>
                <p className="text-lg font-semibold">
                  {formatPrice(variant.price)}
                </p>
              </div>
            ))}

            {/* <Select>
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
                      onClick={() => setSelectedVariation(variant)}
                    >
                      {variant.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
            {/* <h3 className="font-semibold text-2xl text-neutral-500 w-1/2">
              {formatPrice(selectedVariation.price)}
            </h3> */}
            {/* <ScrollArea className="w-full h-[800px] overflow-hidden">
            <pre className="text-sm font-medium">{JSON.stringify(product, null, 2)}</pre>
            </ScrollArea> */}
          </div>
          <div className="mt-4 flex justify-between items-center">


            <Button
              type="button"
              onClick={() => {
                 dispatch(
                   increment({
                     productId: product.id,
                     qty: 1,
                     variantId: selectedVariation.id,
                     variantSKU: selectedVariation.sku,
                     size: selectedVariation.title,
                     image: imageIndex[imgIndex].src,
                     price: selectedVariation.price,
                     productTitle: product.title,
                   })
                 );


              }

              }
              className="w-full"
            >
             Add To Cart {" "}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10"></div>
    </Container>
  );
};
export default ProductDetail;
