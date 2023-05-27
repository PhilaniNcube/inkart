import { getFeaturedProducts, getProducts } from '@/lib/fetchers/products';
import Image from 'next/image'
import { Metadata } from "next";
import Link from 'next/link';
import Hero from './Hero';
import CollectionGrid from './CollectionGrid';
import Container from '@/components/layout/Container';
import CallToAction from './CallToAction';

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


  return (
    <main className="">
      <Hero />
      {/* Featured Collection */}
      {/* <Container>
       <CollectionGrid title="Featured Collection" products={data} />
      </Container> */}
      <CallToAction  />
    </main>
  );
}
