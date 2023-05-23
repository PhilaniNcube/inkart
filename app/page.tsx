import { getProducts } from '@/lib/fetchers/products';
import Image from 'next/image'

export default async function Home() {

const data = await getProducts(2, 1);

  return (
    <main className="">
       {JSON.stringify(data, null, 2)}
    </main>
  )
}
