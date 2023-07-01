"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SearchProducts = () => {

  const router = useRouter()

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting search request');

    const {query} = Object.fromEntries(new FormData(e.currentTarget))



    router.push(
      `/dashboard/products/search?query=${query}`
    );
  }

  return <div className="w-full my-4">
    <form onSubmit={handleSubmit} className="flex relative pl-2 gap-5 items-center justify-between w-full">
      <Input type="search" placeholder="Search Products" id="query" name="query" className="w-full" />
      <Button type="submit" className="flex gap-3 items-center"><SearchIcon /> Search</Button>
    </form>
  </div>;
};
export default SearchProducts;
