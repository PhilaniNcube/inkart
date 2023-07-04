import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types';
import { NextResponse } from 'next/server';



export async function GET(request: Request) {

  console.log('Notify')

const SupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const SupabaseSecret = process.env.SUPABASE_SECRET


const supabase = createClient<Database>(
  SupabaseUrl!,
  SupabaseSecret!
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


  if(typeof payment_id === 'undefined' || payment_id === null) {
     console.log('Error', 'Payment ID is missing')
    throw new Error('Payment ID is missing')
  }

  const date = Date.now()


  const { data: order, error } = await supabase.from('orders').update({
   paid: payment_status === 'COMPLETE' ? true : false,
    payment_id: payment_id.toString(),
    paid_at: new Date(date).toUTCString(),
  }).eq('id', order_id)


  if(error) {
    throw new Error(error.message)

  }



    return NextResponse.json({
    status: 200,
    body: order
  })



}
