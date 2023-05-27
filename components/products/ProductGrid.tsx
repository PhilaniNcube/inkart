/* eslint-disable @next/next/no-img-element */
import { Product } from "@/schema";
import Link from "next/link";
import Image from 'next/image'
import Container from "../layout/Container";
import { formatPrice } from "@/lib/utils";

const ProductGrid = ({products}:{products: Product[]}) => {
  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group w-full group-hover:shadow-md rounded-md"
          >
            <Link
              href={`/products/${product.id}`}
              className="w-full flex items-center justify-center relative"
            >
              <Image
                src={product.images[0].src}
                alt={product.title}
                width={500}
                height={500}
                className="object-cover w-full"
              />
            </Link>
            <div className="flex items-start">
              <p className="mt-3 text-sm font-semibold text-slate-700 w-[70%]">
                {product.title}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700 w-[30%] text-right">
                From {formatPrice(product.variants[0].price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
};
export default ProductGrid;
