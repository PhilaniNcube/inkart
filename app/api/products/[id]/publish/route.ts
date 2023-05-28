import { NextResponse } from "next/server"
import { revalidateTag } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'

export async function POST(request: Request, context:any) {

  const {search} = new URL(request.url)
  // const id = searchParams.get('id')

  console.log(`${BASE_URL}/shops/9354978/products/${context.params.id}/publishing_succeeded.json`)

  const response = await fetch(`${BASE_URL}/shops/9354978/products/${context.params.id}/publish.json`, {
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
    "shipping_template": true
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
