import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getOrders = async (page_size = 20, page = 1) => {
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


const getOrderById = async (id: string) => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();

    if(error) {
        throw new Error(error.message);
    }

    return data;
}


const updateOrderById = async (id: string) => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data:order } = await supabase.from("orders").update({ id }).eq("id", id).select('*').single();

    if(order?.paid === true ) {
      console.log('Order has already been paid')
      return
    } else if (order === null) {
      console.log('Order not found')
      return
    }

      const { data, error } = await supabase.from("orders").update({
      paid: true,
      paid_at: new Date().toISOString()
    }).eq("id", id).select('*').single();

    if(error) {
      console.log(error.message);
        throw new Error(error.message);
    }

    return data;

}


const getOrderValues = async () => {
const supabase = createServerComponentClient<Database>({ cookies });

const {data, error} = await supabase.rpc("get_total_paid_orders").single();

if(error) {
  throw new Error(error.message);
}

return data;


}


export { getOrderById, getOrders, updateOrderById, getOrderValues}
