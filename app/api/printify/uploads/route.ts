import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export async function POST(request: Request) {

  const {file_name, url} = await request.json()


  const response = await fetch(`${URL}/uploads/images.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    },
    body: JSON.stringify({
      file_name,
      url
    })
  })

  const data = await response.json()

  return NextResponse.json({
    data
  })



}
