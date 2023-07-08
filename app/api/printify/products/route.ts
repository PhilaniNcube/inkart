import { ProductAPI } from "@/schema";
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

const supabaseUrl = 'https://hdhqxisqffmoqhpzmhet.supabase.co'
const supabaseKey = process.env.SUPABASE_SECRET || ''

const supabase_service = createClient<Database>(supabaseUrl, supabaseKey)

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export async function POST(request: Request) {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {title, variant_id, image_id, categories} = await request.json()

  console.log(title, variant_id, image_id, categories)

  const {data:variant, error} = await supabase.from("canvas_variants").select("*").eq("id", +variant_id).single()

  if(error) {
    return NextResponse.json(error.message)
  }

  const price = (variant.cost * 1.25).toFixed(0)

  console.log({price})


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
          price: +price,
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

  const data:ProductAPI = await response.json()
  console.log(data)

  const {data:product, error:product_error} = await supabase_service.from("products").insert([{
    ...data,
    print_details: {
      print_on_side: "mirror",
    },
    images: data.images.map((image) => {
      return {
        ...image,
        variant_id: image.variant_ids[0],
      }
    })
  }]).select("*").single()

  if(product) {
 const {data:product_categories, error:error_category} =   await supabase_service.from("product_categories").insert(categories.map((category_id:string) => {
      return {
        product_id: product.id,
        category_id: category_id,
      }
  })).select("*")

    return NextResponse.json({
    product: product,
    categories: product_categories,
    errors: product_error
  })
}


  return NextResponse.json({
    product: product,
    // categories: product_categories,
    errors: product_error
  })



}
