import Navbar from './Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from "next";
import Footer from '@/components/layout/Footer';
import CartProvider from '@/components/Providers/CartProvider';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Stunning Wall Art & Home Decor | InkArt",
  description:
    "Discover our unique collection of beautiful, high-quality wall art and home decor. Perfect for adding a touch of style and personality to any room!",
  keywords: [
    "wall art, home decor, canvas prints, framed art, modern art, photography, paintings, posters, metal wall art, sculptures",
  ],
  openGraph: {
    title: "Stunning Wall Art & Home Decor | InkArt",
    description:
      "Discover our unique collection of beautiful, high-quality wall art and home decor. Perfect for adding a touch of style and personality to any room!",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>

            <Navbar />
            {children}
            <Footer />

        </CartProvider>
      </body>
    </html>
  );
}
