"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PaginationProps = {
  currentPage: string;
  total: number;
  lastPage: number;
};

const TablePagination = ({ currentPage, total, lastPage }: PaginationProps) => {
  const page = currentPage ? parseInt(currentPage) : 1;

  return (
    <div className="flex justify-between items-center bg-slate-400 rounded-lg p-3">
      {page !== 1 && (
        <Link href={`/dashboard/products?page=${page - 1}`}>
          <Button>Prev</Button>
        </Link>
      )}
      <p className="text-white text-xs">
        Page{page} of {lastPage} Pages
      </p>
      {page !== lastPage && (
        <Link href={`/dashboard/products?page=${page + 1}`}>
          <Button>Next</Button>
        </Link>
      )}
    </div>
  );
};
export default TablePagination;
