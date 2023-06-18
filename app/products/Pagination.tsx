"use client"
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  total: number;
  lastPage: number;
}

const Pagination = ({ currentPage, total, lastPage }: PaginationProps) => {

  const page = currentPage ? currentPage : 1;

  return (
    <div className="flex justify-between items-center bg-slate-100 rounded-lg p-3">
      {page !== 1 && (
        <Link href={`/products?page=${page - 1}`}>
          <Button variant="outline">
            <ChevronLeftIcon className="mr-1" />
            Prev
            </Button>
        </Link>
      )}
      <p className="text-slate-700 font-medium text-xs">Page {page} of {lastPage} Pages</p>
      {page !== lastPage && (
        <Link href={`/products?page=${page + 1}`}>
          <Button variant="outline">
            Next
            <ChevronRightIcon className="ml-1" />
            </Button>
        </Link>
      )}
    </div>
  );
};
export default Pagination;
