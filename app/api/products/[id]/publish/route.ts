import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'

export async function POST(request: Request, context:any) {

  const {search} = new URL(request.url)
  // const id = searchParams.get('id')

  console.log(`${BASE_URL}/shops/9354978/products/${context.params.id}/publishing_succeeded.json`)

  const response = await fetch(`${BASE_URL}/shops/9354978/products/${context.params.id}/publishing_succeeded.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    },
    body: JSON.stringify({
      "external" : {
        id: context.params.id,
        handle: `${BASE_URL}/shops/9354978/products/${context.params.id}`
      }
    })
  })

  const data = await response.json()

  console.log('data',data)

  return NextResponse.json({
    status: response.status,
    ok: response.ok,
    body: data
  })



}
