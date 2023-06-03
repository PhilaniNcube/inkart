import { Product, ProductAPI, ProductVariations, ProductGridItem } from "@/schema"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'




type ProductResponse = {
  current_page: string,
  data: ProductGridItem[],
  per_page: number,
  total: number,
  last_page: number,
  links: {
   url: string,
   labl: string,
   active: boolean
  }[]
}

const getProducts = async (page = 1, limit = 16):Promise<ProductResponse> => {


  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products.json?page=${page}&limit=${limit}`, {
    next:{tags: ['products', 'dashboard']},
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  const raw = await data.json() as ProductResponse

  const response= {
    ...raw,
    data: raw.data.map((product) => {
      return {
        id: product.id,
        images: product.images,
        title: product.title,
      }
    })
  }




  return response

}

const getProduct = async (productId:string):Promise<Product> => {

  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products/${productId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  const rawProduct = await data.json() as ProductAPI

  let images = rawProduct.images

  const uniqueVariants = Array.from(new Set(images.map((image) => image.variant_ids[0])))

  console.log(uniqueVariants)


  return {
    ...rawProduct,
    images: rawProduct.images.map((image) => {
      return {
        ...image,
        variant_id: image.variant_ids[0]
      }
    }),
    variants: rawProduct.variants.filter((variant) => uniqueVariants.includes(variant.id))
  }

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



const getProductVariations = async (productId:string):Promise<ProductVariations> => {

  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products/${productId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  const productData:Product = await data.json()
  return productData.variants

}

export { getProducts, getProduct, getFeaturedProducts, getProductVariations}
