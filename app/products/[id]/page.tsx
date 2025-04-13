import { Metadata, ResolvingMetadata } from "next";
import { fetchProductById, getProduct } from "@/lib/fetchers/products";
import ProductDetail from "./ProductDetail";
import Script from "next/script";


export async function generateMetadata({ params}: {params: Promise<{id:string}>}) {

  const { id } = await params;

  const productData = fetchProductById(id);

  const [product] = await Promise.all([productData]);

  const metadata: Metadata = {
    title: `${product.title} | InkArt`,
    description: product.description,
    keywords: product.tags,
    category:
      "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork",
    robots: "follow, index",
    metadataBase: new URL(`https://inkart.com/products/${id}`),
    openGraph: {
      title: `${product.title} | InkArt`,
      description: product.description,
      type: "website",
      ttl: 60 * 60 * 24 * 7,
      siteName: "InkArt",
      locale: "en_US",
      url: `https://inkart.com/products/${id}`,
      images: product.images.map((image:any) => {
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
      images: product.images.map((image:any) => `${image.src}`),
    },
  };

  return metadata;
}

const page = async ({ params}: {params: Promise<{id:string}>}) => {

  const { id } = await params;

  const productData = fetchProductById(id);

  const [product] = await Promise.all([productData]);

  const productSchemas = product.variants.map((variant:any) => {
    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.title,
      productID: variant.id,
      sku: variant.sku,
      image: `https://inkart.com${product.images[0].src}`,
      description: variant.title,
      brand: "Ink Art",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        id: variant.id,
        identitier: variant.sku,
        price: variant.price / 100,
        itemCondition: "http://schema.org/NewCondition",
        availability: "http://schema.org/InStock",
        category:
          "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork",
        seller: {
          "@type": "Organization",
          name: "Ink Art",
        },
      },
    };
  })

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    productID: product.variants[0].sku,
    image: `https://inkart.com${product.images[0].src}`,
    description: product.description,
    brand: "Ink Art",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      id: product.variants[0].id,
      identitier: product.id,
      price: product.variants[0].price / 100,
      itemCondition: "http://schema.org/NewCondition",
      availability: "http://schema.org/InStock",
      category:
        "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork",
      seller: {
        "@type": "Organization",
        name: "Ink Art",
      },
    },
  };

  return (
    <main>
      <Script type="application/ld+json" id="JSONLD-Product">
        {JSON.stringify(schemaData)}
      </Script>
      <ProductDetail product={product} />
    </main>
  );
};
export default page;
