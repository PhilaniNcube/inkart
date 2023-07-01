import Navbar from './Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from "next";
import Footer from '@/components/layout/Footer';
import CartProvider from '@/components/Providers/CartProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import SupabaseProvider from '@/components/Providers/SupabaseProvider';
import { fetchCategories } from '@/lib/fetchers/products';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: admin, error } = await supabase.rpc("is_admin");

  const categories = await fetchCategories();

  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <CartProvider>
            <Navbar categories={categories} user={user} admin={admin} />
            {children}
            <Footer />
          </CartProvider>
        </SupabaseProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
