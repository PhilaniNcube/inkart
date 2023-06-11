import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from 'next/cache';



export async function POST(request: NextRequest, context:any) {



  const data = await request.json()
  // const id = searchParams.get('id')


  // generate an MD5 hash from the req object using the CryptoJS package



    return NextResponse.json({
    status: 200,
    body: data
  })



}
