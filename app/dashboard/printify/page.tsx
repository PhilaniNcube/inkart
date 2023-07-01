import Image from "next/image";
import Link from "next/link";

export type PrintifyBlueprint = {
  id: string;
  title: string;
  description: string;
  brand: string;
  model: string;
  images: string[];
}

export type PrintifyCatalogResponse = {
  data: PrintifyBlueprint[];
}

const page = async () => {

  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL!);

  const {data} = await fetch(`${url}/api/printify/blueprints`).then((res) => res.json()).catch((err) => console.log(err));


  return <div className="w-full">
    <h1 className="text-3xl font-semibold">Printify Catalog</h1>
    <div className="w-full mt-4 grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5">
      {data.map((blueprint: PrintifyBlueprint) => (
        <Link href={`/dashboard/printify/${blueprint.id}`} key={blueprint.id} className="w-full">
          <Image src={blueprint.images[0]} width={400} height={400} alt={blueprint.title} className="w-full object-cover" />
          <div>
            <p className="text-md font-semibold">{blueprint.title}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>;
};
export default page;
