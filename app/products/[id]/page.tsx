import { Metadata, ResolvingMetadata } from "next";
import { getProduct } from "@/lib/fetchers/products";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const productData = getProduct(id);

  const [product] = await Promise.all([productData]);

  const metadata: Metadata = {
    title: `${product.title} | InkArt`,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      title: `${product.title} | InkArt`,
      description: product.description,
      images: product.images.map((image) => {
        return {
          url: image.src,
          width: 400,
          height: 400,
          alt: product.title,
        };
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: product.images.map((image) => (`${image.src}`)),
    },
  };

  return metadata;
}

const page = async ({ params: { id } }: Props) => {
  const productData = getProduct(id);

  const [product] = await Promise.all([productData]);

  return <main>
    <pre>{JSON.stringify(product, null, 2)}</pre>
  </main>;
};
export default page;
