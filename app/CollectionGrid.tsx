/* eslint-disable @next/next/no-img-element */
import { Product } from "@/schema";
import Link from "next/link";
import Image from 'next/image'
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/products/ProductImage";

type CollectionGridProps = {
  title: string;
  products: Product[]
};

const CollectionGrid = ({title, products}:CollectionGridProps) => {


  return (
    <div className="w-full mt-6 container">
      <h2 className="font-bold text-4xl text-slate-700">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {

          const sortedPrices = product.variants.sort((a, b) => a.price - b.price);


          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="w-full flex flex-col justify-center relative group"
            >
              <div className="realtive isolate w-full aspect-square overflow-hidden flex">
                <Image
                  src={product.images[0].src}
                  alt={title}
                  width={500}
                  height={500}
                  className="object-cover w-full absolute inset-0"
                />
                <Image
                  src={product.images[3].src}
                  alt={title}
                  width={500}
                  height={500}
                  className="object-cover w-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-md font-medium">{product.title}</h4>
                <p className="text-xs text-slate-600 font-medium">
                  {sortedPrices[0].title}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-slate-600 font-medium">
                    from {formatPrice(sortedPrices[0].price)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default CollectionGrid;
