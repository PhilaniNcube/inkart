const page = async ({
  searchParams,
}: {
  searchParams: { order_id: string | undefined };
}) => {

  const { order_id } = searchParams;

  // const query = await fetch(
  //   `https://sandbox.payfast.co.za/​eng/query/validate`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ item_name: order_id })
  //   }
  // ).then((response) => response.json()).catch((error) => console.error(error));

  // console.log(query);

  return <div>Success Page</div>;
};
export default page;
