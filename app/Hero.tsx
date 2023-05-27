import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full relative h-[70vh]">
      <Image
        src="/images/wall_art.jpg"
        width={1920}
        height={1280}
        alt="Hero"
        className="w-full object-cover h-[70vh]"
      />
      <div className="absolute inset-0 flex flex-col px-8 py-10 bg-white/30 items-center justify-center">
        <h1 className="text-3xl md:text-5xl text-center max-w-[25ch] font-extrabold text-slate-800">
          Wall Art That Will Transform Your Space
        </h1>
        <Link href="/products?page=1" className="mt-4">
          <Button>View Products</Button>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
