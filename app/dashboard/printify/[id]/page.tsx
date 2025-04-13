import { PrintifyBlueprint } from "../page";
import Image from "next/image";


const page = async ({params}:{params: Promise<{id: string}>}) => {

  const paramsData = await params;
  const { id } = paramsData;

  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL!);

  const { data }: {data:PrintifyBlueprint} = await fetch(
    `${url}/api/printify/blueprints/${id}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

    console.log(data);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold">{data.title}</h1>
      <div
        className="mt-3 text-sm font-medium"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 mt-6">
        {data.images.map((image) => (
          <Image key={image} src={image} alt={data.title} width={500} height={500} className="w-full aspect-square object-cover" />
        ))}
      </div>
    </div>
  );
};
export default page;
