import { getProduct } from "@/lib/fetchers/products";
import { Database } from "@/types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'

export async function GET(req:NextRequest){
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  // const pages = [1,2,3]

  // let productIds:string[] = []

  // for (const page of pages) {

  //    const response = await fetch(`${URL}/shops/9354978/products.json?page=${page}&limit=100`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
  //   }
  // })

  // const data = await response.json()

  // const productIDs = data.data.map((product: any) => {
  //   return product.id
  // })
  // console.log('Adding products from page ', page)
  // productIds = [...productIds, ...productIDs]

  // }

  //  for (let i = 0; i < productIds.length; i++) {
  //   let productID = productIds[i]

  //   const product = await getProduct(productID)

  //   const {data:existingProduct} = await supabase.from('products').insert([
  //     {
  //       id: product.id,
  //       title: product.title,
  //       description: product.description,
  //       images: product.images,
  //       is_locked: product.is_locked,
  //       variants: product.variants,
  //       tags: product.tags,
  //       created_at: product.created_at,
  //       updated_at: product.updated_at,
  //       visible: product.visible,
  //       blueprint_id: product.blueprint_id,
  //       user_id: product.user_id,
  //       shop_id: product.shop_id,
  //       print_provider_id: product.print_provider_id,
  //       print_areas: product.print_areas,
  //       print_details: {
  //         print_on_side: product.print_details.print_on_side,
  //       },
  //       sales_channel_properties: product.sales_channel_properties,
  //       twodaydelivery_enabled: product.twodaydelivery_enabled,
  //     }
  //   ])

  //   console.log({existingProduct})

  //  }

  return NextResponse.json({data:"testing" })

}
