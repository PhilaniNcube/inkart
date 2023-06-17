import { Product, ProductAPI, ProductVariations, ProductGridItem } from "@/schema"
import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const URL = process.env.NEXT_PUBLIC__BASE_URL || 'https://api.printify.com/v1/'




type ProductResponse = {
  current_page: string,
  data: ProductGridItem[],
  per_page: number,
  total: number,
  last_page: number,
  links: {
   url: string,
   lable: string,
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
        is_locked: product.is_locked,
      }
    })
  }

  return response

}



const fetchProducts = async (page: number, page_size: number) => {
const supabase = createServerComponentClient<Database>({ cookies });

const start = (page - 1 ) * page_size;

const end = start + page_size;

const {data:products, error, count} = await supabase.from('products').select('*, category(*)',  {count: 'exact'}).range(start, end).order('title', {ascending: true});

if (error) {
  throw new Error(error.message)
}

return {
  products,
  count
}

}


const fetchProductById = async (id:string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {data:product, error} = await supabase.from('products').select('*, category(*)').eq('id', id).single();

  if (error) {
     throw new Error(error.message)
  }

  return product
}


const fetchCategories = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {data:categories, error} = await supabase.from('categories').select('*')

  if (error) {
     throw new Error(error.message)
  }

  return categories
}


const fetchCategoryById = async (id:string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {data:category, error} = await supabase.from('categories').select('*').eq('id', id).single();

  if (error) {
     throw new Error(error.message)
  }

  return category
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



const getOr = async (page_size = 20, page = 1) => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const start = (page - 1) * page_size;
    const end = start + page_size - 1;

    const { data:orders, error, count } = await supabase.from("orders").select("*", {count: 'exact'}).range(start, end).order('created_at', { ascending: false });

    if(error) {
        throw new Error(error.message);
    }

    return {
      orders,
      count
    };
}

export { getProducts, getProduct, getFeaturedProducts, getProductVariations, fetchProducts, fetchProductById, fetchCategories, fetchCategoryById}
