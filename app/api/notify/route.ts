import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache';
import { Database } from '@/types';



export async function POST(request: Request) {

  console.log('Notify')

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET!
)
  const data = await request.formData()


  const payment_status = data.get('payment_status')

  const amount = data.get('amount_gross')
  const amount_net = data.get('amount_net')
  const amount_fee = data.get('amount_fee')
  const payment_id = data.get('pf_payment_id')

  const requestUrl = new URL(request.url)
  const order_id = requestUrl.searchParams.get('order_id')

  // const id = searchParams.get('id')

   console.log('Notify Webhook' , {
      payment_status,
      order_id,
      amount,
      amount_net,
      amount_fee,
      payment_id
   })
  // generate an MD5 hash from the req object using the CryptoJS package

  if(typeof payment_id === 'undefined' || payment_id === null) {
    console.log('Error', 'Payment ID is missing')
    return NextResponse.json({
    status: 200,
    body: 'Payment ID is missing'
  })
  }

  const date = Date.now()


  const { data: order, error } = await supabase.from('orders').update({
   paid: payment_status === 'COMPLETE' ? true : false,
    payment_id: payment_id.toString(),
    paid_at: new Date(date).toUTCString(),
  }).eq('id', order_id)


  if(error) {
    console.log('Error', error.message, order)
    return NextResponse.json({
    status: 200,
    body: error
  })
  }



    return NextResponse.json({
    status: 200,
    body: order
  })



}
