import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'

export async function POST(request: NextRequest, context:any) {

  const {search} = new URL(request.url)
  const product = request.body
  // const id = searchParams.get('id')

  console.log(request)

  const response = await fetch(`${BASE_URL}/shops/9354978/products/${context.params.id}/publishing_succeeded.json`, {
    method: 'POST',
    headers: {
      cache: 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    },
    body: JSON.stringify({
    "title": true,
    "description": true,
    "images": true,
    "variants": true,
    "tags": true,
    "keyFeatures": true,
    "shipping_template": true,
      "external": {
        "id": `${context.params.id}`,
        "handle": `http://localhost:3000/product/${context.params.id}`,
    }
})
  })

  const data = await response.json()

  console.log('data',data)
  revalidateTag("/dashboard/products");

  return NextResponse.json({
    status: response.status,
    ok: response.ok,
    body: data
  })



}
