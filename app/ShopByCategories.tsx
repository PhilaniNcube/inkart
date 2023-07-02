"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Database } from "@/types";
import Link from "next/link"
import Container from "@/components/layout/Container";

type ComponentProps = {
  categories: Database['public']['Tables']['categories']['Row'][]
}

export default function ShopByCategories({ categories}:ComponentProps) {
  return (
    <Container>
      <div className="overflow-y-hidden">
        <div className="py-12 flex justify-center items-start flex-col">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-medium leading-6 md:leading-8 lg:leading-9 text-gray-800">
            Shop by Category
          </h1>
          <div className="mt-10 md:mt-6 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
            {categories.map((category) => (
              <Link
                href={`/categories/${category.id}`}
                key={category.id}
                className="flex justify-start items-start flex-col space-y-3 md:space-y-4 cursor-pointer"
              >
                <div className="w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={512}
                    height={512}
                    className="w-full object-cover rounded-md"
                  />
                </div>
                <Link
                  href={`/categories/${category.id}`}
                  className="text-sm md:text-base leading-4 text-gray-800 font-medium"
                >
                  {category.title}
                </Link>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}


