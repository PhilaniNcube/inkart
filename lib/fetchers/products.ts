import { Product, ProductAPI, ProductVariations, ProductGridItem, ProductImageObject } from "@/schema"
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


const fetchAdminSearchProducts = async (page: number, page_size: number, query:string) => {
const supabase = createServerComponentClient<Database>({ cookies });

const start = (page - 1 ) * page_size;

const end = start + page_size;

const {data:products, error, count} = await supabase.from('products').select('*, category(*)',  {count: 'exact'}).range(start, end).order('title', {ascending: true}).textSearch('title', query, {config: 'english', type: 'plain'});

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

  const {data:categories, error} = await supabase.from('categories').select('*').order('title', {ascending: true})

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


const fetchCategoryBySlug = async (slug:string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {data:category, error} = await supabase.from('categories').select('*').eq('slug', slug).single();

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

  const rawProduct = await data.json() as any

  let images = rawProduct.images

  const uniqueVariants = Array.from(new Set(images.map((image:any) => image.variant_ids[0])))




  return {
    ...rawProduct,
    images: rawProduct.images.map((image:ProductImageObject) => {
      return {
        ...image,
        variant_id: image.variant_ids[0]
      }
    }),
    variants: rawProduct.variants.filter((variant:any) => uniqueVariants.includes(variant.id))
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



const fetchProductsByCategoryId = async ( id:string) => {



    const supabase = createServerComponentClient<Database>({ cookies });


    const { data,  count:productCount } = await supabase.from("products").select("*", {count: 'exact', head: true}).eq('category', id);

    console.log({productCount})

    const { data:products, error, count } = await supabase.from("products").select("*, category(id, title, slug)", {count: 'exact'}).eq('category', id);

    if(error) {
        throw new Error(error.message);
    }

    return {
      products,
      count
    };
}



const fetchSearchProducts = async ( query:string) => {



    const supabase = createServerComponentClient<Database>({ cookies });




    const { data:products, error, count } = await supabase.from("products").select("*, category(id, title, slug)", {count: 'exact'}).textSearch('title', `${query}`)

    if(error) {
        throw new Error(error.message);
    }

    return {
      products,
      count
    };
}

export { getProducts, getProduct, getFeaturedProducts, getProductVariations, fetchProducts, fetchProductById, fetchCategories, fetchCategoryById, fetchCategoryBySlug, fetchProductsByCategoryId, fetchSearchProducts, fetchAdminSearchProducts}
