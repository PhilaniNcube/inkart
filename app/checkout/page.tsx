import Container from "@/components/layout/Container";
import CheckoutDetails from "./CheckoutDetails";

const page = async () => {

  const url = new URL(`http://localhost:3000/api/currency`);

  const exchangeRate = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json()).catch((err) => console.log(err));

  console.log(exchangeRate.data)

  return <main>
    <CheckoutDetails exchangeRate={exchangeRate.data.USDZAR} />
  </main>;
};
export default page;
