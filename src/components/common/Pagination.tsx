import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';

interface PaginationData {
  currentPage: number;
  totalPages: number;
}

interface PaginationProps<T extends PaginationData> {
  data: T;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = <T extends PaginationData>({
  data,
  page,
  setPage,
}: PaginationProps<T>) => {
  return (
    <nav className="pt-8 h-6 flex flex-row justify-end gap-2 items-center">
      {data.currentPage > 1 && (
        <Button
          className="bg-white h-6 flex items-center justify-center w-6 rounded-md cursor-pointer shadow-md shadow-gray-dark/25"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          <Image
            src="/icon/left-arrow.svg"
            alt="left arrow icon"
            width={12}
            height={12}
          />
        </Button>
      )}
      {Array.from({ length: data.totalPages ?? 0 }, (_, i) => (
        <p
          key={i + 1}
          className={twMerge(
            `border-1 border-gray-light w-7 text-center rounded-md cursor-pointer shadow-md shadow-gray-dark/25 ${
              data.currentPage === i + 1 ? 'bg-primary/25' : 'bg-white'
            }`,
          )}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </p>
      ))}
      {data.currentPage + 1 < data.totalPages && (
        <Button
          className="bg-white h-6 flex items-center justify-center w-6 rounded-md cursor-pointer shadow-md shadow-gray-dark/25"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= data.totalPages}
        >
          <Image
            src="/icon/right-arrow.svg"
            alt="right arrow icon"
            width={12}
            height={12}
          />
        </Button>
      )}
    </nav>
  );
};

export default Pagination;
