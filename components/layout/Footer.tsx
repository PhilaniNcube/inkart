/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SendIcon } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  // get the current year
  const year = new Date().getFullYear();

  return (
    <div className="dark:bg-slate-900">
      <section className="flex items-center justify-center pt-24 bg-gray-100 pb-14 dark:bg-slate-900">
        <footer className="container flex items-center justify-center mx-auto mt-20 md:w-full">
          <div className="flex flex-col px-6 xl:flex-row lg:gap-x-24 md:px-0">
            <div className="flex flex-col items-start justify-start lg:w-80">
              <div className="flex items-center justify-start xl:flex-col xl:items-start">
                <div className="flex justify-center mr-6 text-gray-800 xl:mr-0 dark:text-white">
                  <Image
                    src="/images/ink-art.webp"
                    width={209}
                    height={136}
                    alt="Logo"
                    className="object-cover w-16 h-16"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="xl:mt-8">
                    <p className="text-sm leading-normal text-gray-600 dark:text-gray-300">
                      Copyright © {year} InkArt.
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm leading-normal text-gray-600 dark:text-gray-300">
                      All rights reserved
                    </p>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href="tel:+27659446989"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
                      >
                        +27 65 944 6989
                      </a>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:info@inkart.store"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
                      >
                        info@inkart.store
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start mt-8 space-x-2 lg:space-x-4">
                <button
                  aria-label="twitter"
                  role="button"
                  className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 hover:opacity-75 dark:text-white"
                >
                  <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.5208 13.0051L15.5544 13.5587L14.9948 13.4909C12.9579 13.2311 11.1784 12.3498 9.66756 10.8696L8.92891 10.1352L8.73865 10.6776C8.33575 11.8865 8.59316 13.1633 9.43253 14.022C9.8802 14.4965 9.77948 14.5643 9.00725 14.2819C8.73865 14.1915 8.50363 14.1237 8.48124 14.1576C8.4029 14.2367 8.6715 15.2648 8.88414 15.6716C9.17513 16.2365 9.76828 16.7902 10.4174 17.1178L10.9658 17.3777L10.3167 17.389C9.68994 17.389 9.66756 17.4003 9.73471 17.6376C9.95854 18.372 10.8427 19.1516 11.8276 19.4906L12.5214 19.7278L11.9171 20.0894C11.0218 20.6091 9.96973 20.9029 8.91772 20.9255C8.41409 20.9368 8 20.982 8 21.0159C8 21.1289 9.36538 21.7616 10.16 22.0102C12.5438 22.7446 15.3753 22.4282 17.5017 21.1741C19.0126 20.2815 20.5235 18.5076 21.2286 16.7902C21.6091 15.875 21.9896 14.2028 21.9896 13.4006C21.9896 12.8808 22.0232 12.813 22.6499 12.1916C23.0192 11.83 23.3662 11.4346 23.4333 11.3216C23.5452 11.1069 23.534 11.1069 22.9633 11.299C22.012 11.638 21.8777 11.5928 22.3477 11.0843C22.6947 10.7228 23.1088 10.0674 23.1088 9.87536C23.1088 9.84146 22.9409 9.89796 22.7506 9.99964C22.5492 10.1126 22.1015 10.2821 21.7658 10.3838L21.1614 10.5759L20.613 10.203C20.3108 9.99964 19.8856 9.77367 19.6617 9.70588C19.0909 9.5477 18.218 9.57029 17.7032 9.75107C16.3042 10.2595 15.4201 11.5702 15.5208 13.0051Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  aria-label="youtube"
                  role="button"
                  className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 hover:opacity-75 dark:text-white"
                >
                  <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.6679 10.4995C23.4022 10.701 23.9805 11.2948 24.1768 12.0488C24.5335 13.4153 24.5335 16.2666 24.5335 16.2666C24.5335 16.2666 24.5335 19.1178 24.1768 20.4845C23.9805 21.2385 23.4022 21.8322 22.6679 22.0338C21.3371 22.4 16.0001 22.4 16.0001 22.4C16.0001 22.4 10.6632 22.4 9.3323 22.0338C8.59795 21.8322 8.01962 21.2385 7.82335 20.4845C7.4668 19.1178 7.4668 16.2666 7.4668 16.2666C7.4668 16.2666 7.4668 13.4153 7.82335 12.0488C8.01962 11.2948 8.59795 10.701 9.3323 10.4995C10.6632 10.1333 16.0001 10.1333 16.0001 10.1333C16.0001 10.1333 21.3371 10.1333 22.6679 10.4995ZM14.4001 13.8666V19.1999L18.6668 16.5333L14.4001 13.8666Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-row mt-6 lg:mt-8 xl:mt-0 lg:gap-x-14 gap-x-10">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-y-0 gap-x-0 lg:gap-x-0">
                <div className="lg:w-40">
                  <h2 className="text-lg font-medium leading-loose text-gray-800 dark:text-white md:text-xl">
                    Company
                  </h2>{" "}
                  <div className="flex flex-col items-start justify-start mt-6 space-y-2">
                    <div>
                      <Link
                        href="/about-us"
                        className="text-sm leading-relaxed text-gray-800 dark:text-white focus:outline-none focus:opacity-75 hover:opacity-75 md:text-base"
                      >
                        About us
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/contact-us"
                        className="text-sm leading-relaxed text-gray-800 dark:text-white focus:outline-none focus:opacity-75 hover:opacity-75 md:text-base"
                      >
                        Contact us
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:w-40">
                  <h2 className="text-lg font-medium leading-loose text-gray-800 dark:text-white md:text-xl">
                    Support
                  </h2>
                  <div className="flex flex-col items-start justify-start mt-6 space-y-2">
                    <div>
                      <Link
                        href="/terms-and-conditions"
                        className="text-sm leading-relaxed text-gray-800 dark:text-white focus:outline-none focus:opacity-75 hover:opacity-75 md:text-base"
                      >
                        Terms and conditions
                      </Link>
                    </div>

                    <div>
                      <Link
                        href="/privacy-policy"
                        className="text-sm leading-relaxed text-gray-800 dark:text-white focus:outline-none focus:opacity-75 hover:opacity-75 md:text-base"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h2 className="text-lg font-medium leading-loose text-gray-800 w-60 md:text-xl dark:text-white">
                    Get Updates and more
                  </h2>
                  <div className="flex flex-col items-start justify-start mt-6 space-y-2 bg-white rounded-lg dark:bg-gray-800">
                    <div className="flex items-center justify-between w-full space-x-2 sm:space-x-0">
                      <div className="relative w-full">
                        <input
                          className="w-full h-10 p-2 text-xs placeholder-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:placeholder-gray-300 md:text-base"
                          type="text"
                          placeholder="Your email address"
                        />
                        <Button
                          aria-label="send email"
                          role="button"
                          className="absolute top-0 right-0 flex items-center justify-center h-10 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:opacity-75 sm:p-0 sm:w-12 bg-slate-700"
                          type="submit"
                        >
                          <SendIcon size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:hidden sm:mt-0">
              <h2 className="text-lg font-medium leading-loose text-gray-800 w-60 md:text-xl dark:text-white">
                Get Updates and more
              </h2>
              <div className="flex flex-col items-start justify-start mt-6 space-y-2 bg-white rounded-lg dark:bg-gray-800">
                <div className="flex items-center justify-between w-full space-x-2 sm:space-x-0">
                  <div className="relative w-full">
                    <input
                      className="w-full h-10 p-2 text-xs placeholder-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:placeholder-gray-300 md:text-base"
                      type="text"
                      placeholder="Your email address"
                    />
                    <Button
                      aria-label="send email"
                      role="button"
                      className="absolute top-0 right-0 flex items-center justify-center h-10 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:opacity-75 sm:p-0 sm:w-12 bg-slate-700"
                      type="submit"
                    >
                      <SendIcon size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
