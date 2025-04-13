import Navbar from './Navbar'
import './globals.css'
import { Metadata } from "next";
import Footer from '@/components/layout/Footer';
import CartProvider from '@/components/Providers/CartProvider';
import { cookies } from "next/headers";
import SupabaseProvider from '@/components/Providers/SupabaseProvider';
import { fetchCategories } from '@/lib/fetchers/products';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from 'react';
import Analytics from '@/components/Providers/Analytics';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 0 // revalidate this page every 60 seconds


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

};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {




  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <CartProvider>
      
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </SupabaseProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
