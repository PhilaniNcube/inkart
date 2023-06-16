import { getExchangeRate } from "@/lib/utils";
import CartDetails from "./CartDetails";

const page = async ({searchParams}:{searchParams:any}) => {



    const exchangeRate = await getExchangeRate()

  return <main className="w-full">
    <CartDetails exchangeRate={exchangeRate} />
  </main>;
};
export default page;
