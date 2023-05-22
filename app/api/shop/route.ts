import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'

export async function GET(request: Request) {



  const response = await fetch(`${URL}shops.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      "User-Agent": "Node-JS"
    }
  })

  const data = await response.json()

  return NextResponse.json({
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: data
  })



}
