
import CartDetails from "./CartDetails";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getExchangeRate } from "@/lib/utils";

const page = async ({searchParams}:{searchParams:any}) => {

    const supabase = createServerComponentClient<Database>({ cookies });

    const {data: {user}} = await supabase.auth.getUser();



    const exchangeRate = await getExchangeRate();



  return <main className="w-full">
    <CartDetails exchangeRate={exchangeRate} user={user} />
  </main>;
};
export default page;
