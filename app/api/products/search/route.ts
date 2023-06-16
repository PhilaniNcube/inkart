import { Product } from "@/schema"
import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'

export async function GET(request: Request) {



  const { search} = new URL(request.url)

  const query = search.split('=')[1]


  const response = await fetch(`${BASE_URL}/shops/9354978/products.json?page=1&limit=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  const {current_page, data, last_page, total} = await response.json()


  const filteredProducts:Product[] = data.filter((product:Product) => {
    return product.title.toLowerCase().includes(query.toLowerCase())
  })



  return NextResponse.json({
    status: response.status,
    ok: response.ok,
    total: filteredProducts.length,
    products: filteredProducts,
  })



}
