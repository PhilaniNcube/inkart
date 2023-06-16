import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache';



export async function POST(request: Request) {

  const data = await request.json()
   const supabase = createRouteHandlerClient({ cookies })

  // const requestUrl = new URL(request.url)
  // const order_id = requestUrl.searchParams.get('order_id')

  // const id = searchParams.get('id')

   console.log('Notify Webhook' , { data})
  // generate an MD5 hash from the req object using the CryptoJS package



    return NextResponse.json({
    status: 200,
    body: data
  })



}
