/* eslint-disable @next/next/no-img-element */
import { Product } from "@/schema";
import Link from "next/link";
import Image from 'next/image'

type CollectionGridProps = {
  title: string;
  products: Product[]
};

const CollectionGrid = ({title, products}:CollectionGridProps) => {
  return <div className="w-full mt-6">
    <h2 className="font-bold text-slate-700 text-xl">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="w-full flex items-center justify-center relative">
          <img src={product.images[0].src} alt={product.title} className="object-cover"  />
        </Link>
      ))}
    </div>
  </div>;
};
export default CollectionGrid;
