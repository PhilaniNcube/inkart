
import { Metadata } from "next";
import Hero from './Hero';
import CallToAction from './CallToAction';
import { fetchCategories, fetchFeaturedProducts } from '@/lib/fetchers/products';
import ShopByCategories from './ShopByCategories';
import CollectionGrid from "./CollectionGrid";

export const metadata: Metadata = {
  title: "Stunning Wall Art & Home Decor | InkArt",
  description:
    "Discover our unique collection of beautiful, high-quality wall art and home decor. Perfect for adding a touch of style and personality to any room!",
  keywords: [
    "wall art, home decor, canvas prints, framed art, modern art, photography, paintings, posters, metal wall art, sculptures",
  ],
  openGraph: {
    title: "Stunning Wall Art & Home Decor | InkArt",
    description: "Discover our unique collection of beautiful, high-quality wall art and home decor. Perfect for adding a touch of style and personality to any room!",

  },
  viewport: "width=device-width, initial-scale=1",

};


export default async function Home() {

const categories = await fetchCategories()

const featuredProducts = await fetchFeaturedProducts()


  return (
    <main className="">
      <Hero />
      {/* Featured Collection */}
      {/* <Container>
      </Container> */}
      <CollectionGrid title="Featured Collection" products={featuredProducts} />
      <ShopByCategories categories={categories} />
      <CallToAction />
    </main>
  );
}
