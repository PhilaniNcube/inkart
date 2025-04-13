
import CartDetails from "./CartDetails";
import { getExchangeRate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

const page = async () => {

    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser();



    const exchangeRate = await getExchangeRate();



  return <main className="w-full">
    <CartDetails exchangeRate={exchangeRate} user={user} />
  </main>;
};
export default page;
