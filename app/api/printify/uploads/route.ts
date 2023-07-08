import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export async function POST(request: Request) {

  const {file_name, url} = await request.json()


  const response = await fetch(`${URL}/uploads/images.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',

    },
    body: JSON.stringify({
      file_name,
      url: url
    })
  }).then(res => res.json()).catch(err => {
    console.log(err)
    return NextResponse.json({error: err })
  })

  const data = await response

  console.log({data})

  return NextResponse.json({
    data
  })



}
