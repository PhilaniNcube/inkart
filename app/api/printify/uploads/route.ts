import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1'

export const runtime = 'edge'

export async function POST(request: Request) {

  const {file_name, url} = await request.json()


  const response = await fetch(`${URL}/uploads/images.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST, PUT, DELETE',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": "true",

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
