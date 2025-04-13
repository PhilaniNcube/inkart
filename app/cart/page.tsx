
import CartDetails from "./CartDetails";

import { createClient } from "@/utils/supabase/server";

const page = async () => {

    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser();





  return <main className="w-full">
    <CartDetails  user={user} />
  </main>;
};
export default page;
