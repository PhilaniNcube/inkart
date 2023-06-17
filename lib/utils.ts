import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPrice(price:number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  return formatter.format(price/100)
}




const generateSignature = (data:any, passPhrase = null || '') => {
  // Create parameter string
  let pfOutput = "";
  for (let key in data) {
    if(data.hasOwnProperty(key)){
      if (data[key] !== "") {
        pfOutput +=`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }



  return CryptoJS.MD5(pfOutput.toString());
};


export const getExchangeRate = async () => {

  // const exchangeRate = await fetch(
  //   `http://apilayer.net/api/live?access_key=${process.env.CURRENCY_API_KEY}&currencies=ZAR&source=USD&format=1`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .catch((err) => {
  //     console.log(err)
  //     throw new Error(err)
  //   });


  return 20;
  }
