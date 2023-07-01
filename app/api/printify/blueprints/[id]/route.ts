import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export async function GET(  request: Request,
  { params: {id} }: { params: { id: string } }) {




  const response = await fetch(`${URL}/catalog/blueprints/${id}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  const data = await response.json()

  return NextResponse.json({
    data
  })



}
