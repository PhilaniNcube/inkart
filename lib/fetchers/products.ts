import {
  Product,
  ProductAPI,
  ProductVariations,
  ProductGridItem,
  ProductImageObject,
} from "@/schema";
import { Database } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC__BASE_URL || "https://api.printify.com/v1/";

type ProductResponse = {
  current_page: string;
  data: ProductGridItem[];
  per_page: number;
  total: number;
  last_page: number;
  links: {
    url: string;
    lable: string;
    active: boolean;
  }[];
};

const getProducts = async (page = 1, limit = 16): Promise<ProductResponse> => {
  const data = await fetch(
    `https://api.printify.com/v1/shops/9354978/products.json?page=${page}&limit=${limit}`,
    {
      next: { tags: ["products", "dashboard"] },
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      },
    }
  );

  const raw = (await data.json()) as ProductResponse;

  const response = {
    ...raw,
    data: raw.data.map((product) => {
      return {
        id: product.id,
        images: product.images,
        title: product.title,
        is_locked: product.is_locked,
      };
    }),
  };

  return response;
};

const fetchProducts = async (page: number, page_size: number) => {
  const supabase = await createClient();

  const start = (page - 1) * page_size;

  const end = start + page_size;

  const fetchProductsQuery = supabase
    .from("products")
    .select("*, category(*)", { count: "exact" })
    .range(start, end)
    .order("title", { ascending: true });

  type ProductsWithCategory = QueryData<typeof fetchProductsQuery>;

  const { data: products, error, count } = await fetchProductsQuery;

  if (error) {
    throw new Error(error.message);
  }

  return {
    products: products as ProductsWithCategory,
    count,
  };
};

const fetchAdminSearchProducts = async (
  page: number,
  page_size: number,
  query: string
) => {
  const supabase = await createClient();

  const start = (page - 1) * page_size;

  const end = start + page_size;

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*, category(*)", { count: "exact" })
    .range(start, end)
    .order("title", { ascending: true })
    .textSearch("title", query, { config: "english", type: "plain" });

  if (error) {
    throw new Error(error.message);
  }

  return {
    products,
    count,
  };
};

const fetchFeaturedProducts = async () => {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*, category(*)", { count: "exact" })
    .order("title", { ascending: true })
    .eq("featured", true);

  if (error) {
    throw new Error(error.message);
  }

  return products;
};

const fetchProductById = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, category(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchCategories = async () => {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return categories;
};

const fetchCategoryById = async (id: string) => {
  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return category;
};

const fetchCategoryBySlug = async (slug: string) => {
  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return category;
};

const getProduct = async (productId: string): Promise<Product> => {
  const data = await fetch(
    `https://api.printify.com/v1/shops/9354978/products/${productId}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      },
    }
  );

  const rawProduct = (await data.json()) as any;

  let images = rawProduct.images;

  const uniqueVariants = Array.from(
    new Set(images.map((image: any) => image.variant_ids[0]))
  );

  return {
    ...rawProduct,
    images: rawProduct.images.map((image: ProductImageObject) => {
      return {
        ...image,
        variant_id: image.variant_ids[0],
      };
    }),
    variants: rawProduct.variants.filter((variant: any) =>
      uniqueVariants.includes(variant.id)
    ),
  };
};

const getFeaturedProducts = async (
  query: string
): Promise<{ current_page: string; data: Product[] }> => {
  const data = await fetch(
    `https://api.printify.com/v1/shops/9354978/products.json?search=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      },
    }
  );

  return await data.json();
};

const getProductVariations = async (
  productId: string
): Promise<ProductVariations> => {
  const data = await fetch(
    `https://api.printify.com/v1/shops/9354978/products/${productId}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`,
      },
    }
  );

  const productData: Product = await data.json();
  return productData.variants;
};

const fetchProductsByCategoryId = async (id: string) => {
  const supabase = await createClient();

  const {
    data: products,
    count: productCount,
    error,
  } = await supabase
    .from("product_categories")
    .select("*, category_id(*), product_id(*)")
    .eq("category_id", id);

  if (error) {
    throw new Error(error.message);
  }

  return products;
};

const fetchSearchProducts = async (query: string) => {
  const supabase = await createClient();

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*, category(id, title, slug)", { count: "exact" })
    .textSearch("title", `${query}`);

  if (error) {
    throw new Error(error.message);
  }

  return {
    products,
    count,
  };
};

const fetchProductCategories = async (productId: string) => {
  const supabase = await createClient();

  const { data: productCategories, error } = await supabase
    .from("product_categories")
    .select("*, product_id(*), category_id(*)")
    .eq("product_id", productId);

  if (error) {
    throw new Error(error.message);
  }

  return productCategories;
};

const fetchProductsFormCategoryId = async (categoryId: string) => {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("product_categories")
    .select("*, product_id(*), category_id(*)")
    .eq("category_id", categoryId);

  if (error) {
    throw new Error(error.message);
  }

  return products;
};

export {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getProductVariations,
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchCategoryById,
  fetchCategoryBySlug,
  fetchProductsByCategoryId,
  fetchSearchProducts,
  fetchAdminSearchProducts,
  fetchFeaturedProducts,
  fetchProductCategories,
  fetchProductsFormCategoryId,
};
