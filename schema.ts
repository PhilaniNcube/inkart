export interface ProductAPI {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: {
      name: string;
      type: string;
      values: {
        id: number;
        title: string;
      }[]
    }[];
    variants: {
      id: number;
      sku: string;
      cost: number;
      price: number;
      title: string;
      grams: number;
      is_enabled: boolean;
      is_default: boolean;
      is_available: boolean;
      options: number[];
      quantity: number;
    }[];
   images: {
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
    is_selected_for_publishing: boolean;
   }[];
   created_at: string;
    updated_at: string;
    visible: boolean;
    is_locked: boolean;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: {
      variant_ids: number[];
      placeholders:{
        position: string;
        images:{
          id:string;
          name: string;
          type: string;
          height: number;
          width: number;
          x: number;
          y: number;
          scale: number;
          angle: number;
        }[]
      }[]
    }[];
    print_details: any[];
    sales_channel_properties: string[];
    twodaydelivery_enabled: boolean;
}
export interface Product {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: {
      name: string;
      type: string;
      values: {
        id: number;
        title: string;
      }[]
    }[];
    variants: {
      id: number;
      sku: string;
      cost: number;
      price: number;
      title: string;
      grams: number;
      is_enabled: boolean;
      is_default: boolean;
      is_available: boolean;
      options: number[];
      quantity: number;
    }[];
   images: {
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
    is_selected_for_publishing: boolean;
    variant_id?: number;
   }[];
   created_at: string;
    updated_at: string;
    visible: boolean;
    is_locked: boolean;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: {
      variant_ids: number[];
      placeholders:{
        position: string;
        images:{
          id:string;
          name: string;
          type: string;
          height: number;
          width: number;
          x: number;
          y: number;
          scale: number;
          angle: number;
        }[]
      }[]
    }[];
    print_details: {
      print_on_side: string;
    };
    sales_channel_properties: string[];
    twodaydelivery_enabled: boolean;
}

export type ProductGridItem = {
   id: string,
   title: string,
    images: {
     src:string,
      variant_ids: number[],
      position: string,
      is_default: boolean,
      is_selected_for_publishing: boolean,
    }[],
    is_locked: boolean,
}

export interface CartItem {
  qty: number;
  productId: string;
  productTitle: string;
  image: string;
  price: number;
  variantId: number;
  variantSKU: string;
  size: string
}


export type ProductVariations = Product['variants']
export type ProductImageObject = {
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
    is_selected_for_publishing: boolean;
    // variant_id?: number;
}
