import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export async function POST(request: Request) {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {title, variant_id, image_id} = await request.json()

  console.log(title, variant_id, image_id)

  const {data:variant, error} = await supabase.from("canvas_variants").select("*").eq("id", +variant_id).single()

  if(error) {
    return NextResponse.json(error.message)
  }

  const price = variant.cost * 1.25


  const response = await fetch(`${URL}/shops/9354978/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    },
    body: JSON.stringify({
      title:title,
      description: "This is a user generated product",
      blueprint_id: 50,
      print_provider_id: 2,
      variants: [
        {
          id: +variant_id,
          price: price,
          is_enabled: true,
        }
      ],
      print_areas: [
        {
          variant_ids: [variant_id],
          placeholders: [
            {
              position: "front",
              images: [
                {
                  id: image_id,
                  x: 0.5,
                  y: 0.5,
                  scale: 1,
                  angle: 0,
                }
              ]
            }
          ]
        }
      ]
    })
  })

  const data = await response.json()

  return NextResponse.json({
    data
  })



}
