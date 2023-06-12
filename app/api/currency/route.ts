import { NextResponse } from "next/server";


export async function GET(){

  const response = await fetch(`http://apilayer.net/api/live?access_key=49565023be8b37e1c20d51f1cd6ae687&currencies=ZAR&source=USD&format=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await response.json();


  const currency = result.quotes

  return NextResponse.json({data: currency});
}
