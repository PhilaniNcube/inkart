import { Product } from "@/schema"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'


type ProductResponse = {
  current_page: string,
  data: Product[],
  per_page: number,
  total: number,
  last_page: number,
  links: {
   url: string,
   labl: string,
   active: boolean
  }[]
}

const getProducts = async (page = 1, limit = 10):Promise<ProductResponse> => {

  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products.json?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })



  return await data.json()

}

const getProduct = async (productId:string):Promise<Product> => {

  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products/${productId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  return await data.json()

}

const getFeaturedProducts = async (query:string):Promise<{current_page:string, data:Product[]}> => {

  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products.json?search=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  return await data.json()

}

export { getProducts, getProduct, getFeaturedProducts}
