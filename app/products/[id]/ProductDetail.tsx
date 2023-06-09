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
import { Database } from "@/types";
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import analytics from "@/utils/analytics";

type ProductDetailProps = {
  product: Database['public']['Tables']['products']['Row'];
}

const ProductDetail = ({product}:ProductDetailProps) => {

  const router = useRouter()

  const variants = product.variants.filter((variant) => variant.is_enabled === true);

 const sortedPrices = variants.sort((a, b) => a.price - b.price);

  const [imgIndex, setImgIndex] = useState(0)


  const [selectedVariation, setSelectedVariation] = useState(
    sortedPrices[imgIndex]
  );


  const imageIndex = product.images.filter((img) => img.variant_ids.includes(selectedVariation.id))

  const dispatch = useAppDispatch()




  useEffect(() => {
    analytics.track("view_item", {
      currency: "USD",
      value: selectedVariation.price / 100,
      item_id: selectedVariation.sku,
      items: [
        {
          item_id: selectedVariation.sku,
          affiliation: "Ink Art",
          item_name: product.title,
          item_price: selectedVariation.price / 100,
          item_varaint: selectedVariation.title,
          index: 0,
          quantity: 1,
        },
      ],
    });
  },[selectedVariation, product])




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
            {sortedPrices.map((variant, idx) => (
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
            <Dialog>
              <DialogTrigger className="flex w-full">
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
                  }}
                  className="w-full text-lg uppercase"
                >
                  Add To Cart{" "}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Product Added To Cart</DialogTitle>
                  <DialogDescription>
                    {product.title} has been added to your cart.
                    <Image
                      src={imageIndex[imgIndex].src}
                      width={500}
                      height={500}
                      alt={product.title}
                      className="w-full object-cover aspect-square group-hover:opacity-75"
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="button" onClick={() => router.push("/cart")}>
                    View Cart
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-10"></div>
    </Container>
  );
};
export default ProductDetail;
