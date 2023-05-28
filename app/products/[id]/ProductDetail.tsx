"use client"
import Container from "@/components/layout/Container";
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
                          className="p-3 border-2 border-neutral-300 flex flex-col space-y-2 rounded-lg cursor-pointer"
                        >
                          {" "}
                          <Image
                            key={idx}
                            src={image.src}
                            width={500}
                            height={500}
                            alt={variant.title}
                            className="w-full object-cover aspect-square"
                          />{" "}
                          <p className="text-sm font-medium">{variant.title}</p>
                          <p className="text-lg font-semibold">
                            {formatPrice(variant.price)}
                          </p>
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
      <div className="mt-10"></div>
    </Container>
  );
};
export default ProductDetail;
