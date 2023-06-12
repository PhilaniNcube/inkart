import Container from "@/components/layout/Container";
import CheckoutDetails from "./CheckoutDetails";

const page = async () => {

  const url = new URL(`http://localhost:3000/api/currency`);

  const exchangeRate = await fetch(
    `http://apilayer.net/api/live?access_key=${process.env.CURRENCY_API_KEY}&currencies=ZAR&source=USD&format=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  console.log(exchangeRate.data)

  return (
    <main>
      {/* <pre>{JSON.stringify(exchangeRate.quotes.USDZAR, null, 2)}</pre> */}
      <CheckoutDetails exchangeRate={exchangeRate.quotes.USDZAR} />
    </main>
  );
};
export default page;
