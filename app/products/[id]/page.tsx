import { Metadata, ResolvingMetadata } from "next";
import { fetchProductById, getProduct } from "@/lib/fetchers/products";
import ProductDetail from "./ProductDetail";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const productData = fetchProductById(id);

  const [product] = await Promise.all([productData]);

  const metadata: Metadata = {
    title: `${product.title} | InkArt`,
    description: product.description,
    keywords: product.tags,
    viewport: "width=device-width, initial-scale=1",
    robots: "follow, index",
    metadataBase: new URL(`https://inkart.com/products/${id}`),
    openGraph: {
      title: `${product.title} | InkArt`,
      description: product.description,
      type: "website",
      ttl: 60*60*24*7,
      siteName: "InkArt",
      locale: "en_US",
      url: `https://inkart.com/products/${id}`,
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
      images: product.images.map((image) => `${image.src}`),
    },
  };

  return metadata;
}

const page = async ({ params: { id } }: Props) => {
  const productData = fetchProductById(id);

  const [product] = await Promise.all([productData]);

  return <main>
    <ProductDetail product={product} />
  </main>;
};
export default page;
