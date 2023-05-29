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
import { Product } from "@/schema";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";

type ProductDetailProps = {
  product: Product;
}

const ProductDetail = ({product}:ProductDetailProps) => {

  const [imageIndex, setImageIndex] = useState(0)



  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 ">
        <div className="w-full flex space-x-3 ">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {product.variants.map((variant, index) => {
                return (
                  <Fragment key={variant.id}>
                    {product.images.map((image, idx) => {
                      if (
                        image.variant_ids[0] !== variant.id ||
                        image.is_default === false
                      )
                        return null;

                      return (
                        <div
                          onClick={() => console.log(variant, product)}
                          key={variant.id}
                          className="p-3 group border-2 border-neutral-300 flex flex-col space-y-2 rounded-lg cursor-pointer relative"
                        >
                          {" "}
                          <Image
                            key={idx}
                            src={image.src}
                            width={500}
                            height={500}
                            alt={variant.title}
                            className="w-full object-cover aspect-square group-hover:opacity-75"
                          />{" "}
                          <p className="text-sm font-medium">{variant.title}</p>
                          <p className="text-lg font-semibold">
                            {formatPrice(variant.price)}
                          </p>
                          <div className="hidden group-hover:absolute group-hover:inset-0 h-full transition-all duration-100 group-hover:flex flex-col justify-center items-center">
                            <Button
                              type="button"
                              className="flex items-center space-x-2"
                            >
                              <span>Add to Cart</span>
                              <ShoppingBag />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
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
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {product.images.map((image, index) => {
            if (!image.src.includes("context-1")) return null;

            const title = product.variants.find(
              (variant) => variant.id === image.variant_ids[0]
            )?.title;

            console.log(title);

            return (
              <div key={index}>
                <Image
                  src={image.src}
                  width={400}
                  height={400}
                  alt={image.variant_ids[0].toString()}
                  className="w-full aspect-square object-cover"
                />
                <p className="text-xs font-medium">{title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
export default ProductDetail;
