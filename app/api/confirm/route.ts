

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {

  const data = await request.json()
   const supabase = createClient()

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
