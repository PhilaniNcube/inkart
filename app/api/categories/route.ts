import { fetchCategories } from "@/lib/fetchers/products";
import { Database } from "@/types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

  const categories = await fetchCategories()

  return NextResponse.json({data:categories})

}
