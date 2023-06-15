import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getOrders = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase.from("orders").select("*");

    if(error) {
        throw new Error(error.message);
    }

    return data;
}


const getOrderById = async (id: string) => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();

    if(error) {
        throw new Error(error.message);
    }

    return data;
}


export { getOrderById, getOrders}
