import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/layout/Container";

function CallToAction() {
  return (
    <Container>
      <div className="pb-16">
        {/* Code block starts */}
        <div>
          <section className="py-12 px-4 md:px-6 lg:px-20  2xl:mx-auto 2xl:container bg-white">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/2 flex items-center">
                <Image
                  loading="lazy"
                  className="rounded aspect-video"
                  src="/images/room_mockup.jpg"
                  alt="Two Developer Girls writing code"
                  width={1920}
                  height={1280}
                />
              </div>
              <div className="flex flex-col justify-center w-full md:w-1/2">
                <div className="">
                  <h3
                    role="heading"
                    className="text-2xl xl:text-4xl font-semibold leading-6 xl:leading-10 text-gray-800"
                  >
                    Wall Art
                  </h3>
                  <p
                    role="contentinfo"
                    className="text-base xl:text-xl text-gray-600 xl:leading-normal pt-2 lg:pt-4"
                  >
                    The Perfect Way to Personalize Your Space
                  </p>
                  <Link href="/products?page=1">
                    <Button >
                     Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Code block ends */}
      </div>
    </Container>
  );
}

export default CallToAction;
