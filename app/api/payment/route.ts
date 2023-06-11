import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, context:any) {



  const data = await request.json()
  // const id = searchParams.get('id')



  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Accept', 'application/json')
  myHeaders.append('version', '1.0')
  myHeaders.append('merchant_id', `${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID}`)
  myHeaders.append('merchant_key', `${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY}`)
  myHeaders.append('timestamp', ``)


  const urlencoded = new URLSearchParams()
  urlencoded.append('merchant_id', `${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID}`)
  urlencoded.append('merchant_key', `${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY}`)
  urlencoded.append('return_url', `https://4f1c-2c0f-f4c0-2202-6ea4-953e-6f9-a40b-e76b.ngrok-free.app/checkout/success`)
  urlencoded.append('cancel_url', `https://4f1c-2c0f-f4c0-2202-6ea4-953e-6f9-a40b-e76b.ngrok-free.app/checkout/cancel`)
  urlencoded.append('notify_url', `https://4f1c-2c0f-f4c0-2202-6ea4-953e-6f9-a40b-e76b.ngrok-free.app/api/notify`)
  urlencoded.append('name_first', `${data.first_name}`)
  urlencoded.append('name_last', `${data.last_name}`)
  urlencoded.append('email_address', `${data.email}`)
  urlencoded.append('cell_number', `${data.phone}`)
  urlencoded.append('amount', `${data.amount}`)
  urlencoded.append('item_name', `${data.item_name}`)
  urlencoded.append('confirmation_address', `${data.email}`)

    const options =  {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }



  const result = await fetch(`${process.env.NEXT_PUBLIC_PAYFAST_POST_URL}`, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  })

  // console.log(await result.json())

  const res = await result.text()




  // generate an MD5 hash from the req object using the CryptoJS package



    return NextResponse.json({
    data:res
  })



}
