const getProducts = async (page = 1, limit = 10) => {

  const data = await fetch(`https://api.printify.com/v1/shops/9354978/products.json?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_API_TOKEN}`
    }
  })

  console.log(data)

  return await data.json()

}

export { getProducts}
