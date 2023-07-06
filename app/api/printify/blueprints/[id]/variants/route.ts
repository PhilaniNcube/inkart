import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export async function GET(  request: Request,
  { params: {id} }: { params: { id: string } }) {

  // const supabase = createServerComponentClient<Database>({ cookies });

  const response = await fetch(`${URL}/catalog/blueprints/${id}/print_providers/2/variants.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  const data = await response.json()

  // const { data: variants } = await supabase.from("canvas_variants").insert(data.variants)

  return NextResponse.json({data})



}
