/* eslint-disable @next/next/no-img-element */
import { Product } from "@/schema";
import Link from "next/link";
import Image from 'next/image'
import { formatPrice } from "@/lib/utils";

type CollectionGridProps = {
  title: string;
  products: Product[]
};

const CollectionGrid = ({title, products}:CollectionGridProps) => {
  return (
    <div className="w-full mt-6 container">
      <h2 className="font-bold text-4xl text-slate-700">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="w-full flex flex-col justify-center relative group"
          >
            <Image
              width={500}
              height={500}
              src={product.images[0].src}
              alt={product.title}
              className="w-full shadow-md group-hover:shadow-xl transition-all duration-200 rounded-lg aspect-square object-cover"
            />
            <div className="mt-2">
              <h4 className="text-md font-medium">{product.title}</h4>
              <p className="text-xs text-slate-600 font-medium">
                {product.variants[0].title}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg text-slate-600 font-medium">
                  {formatPrice(product.variants[0].price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CollectionGrid;
