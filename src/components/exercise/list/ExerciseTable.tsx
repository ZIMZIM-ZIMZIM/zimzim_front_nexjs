'use client';
import React, { Dispatch, SetStateAction } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';

import Button from '#components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import useExerciseData, { FlattenedExercise } from '#/hooks/useExerciseData';
import { useGetExerciseColumns } from '#/hooks/useExerciseColumns';

import LeftArrowIcon from 'public/icon/left-arrow.svg';
import RightArrowIcon from 'public/icon/right-arrow.svg';
import { useRouter } from 'next/router';

interface ExerciseTableProps {
  checkedExercise: string[];
  setCheckedExercise: Dispatch<SetStateAction<string[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

interface CustomColumnMeta {
  className?: string;
}

const ExerciseTable = ({
  checkedExercise,
  setCheckedExercise,
  page,
  setPage,
}: ExerciseTableProps) => {
  // const navigate = useNavigate();
  const router = useRouter();

  const columnHelper = createColumnHelper<FlattenedExercise>();

  const { exerciseData, flattenedData } = useExerciseData(page);

  const columns = useGetExerciseColumns(
    columnHelper,
    flattenedData,
    checkedExercise,
    setCheckedExercise,
  );

  const table = useReactTable({
    data: flattenedData ?? [],
    columns: columns as ColumnDef<FlattenedExercise, any>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <ContentBox className="rounded-2xl w-full py-4">
        <table className="table-auto">
          <thead className="border-b-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={twMerge(
                      'text-center pb-2',
                      (header.column.columnDef.meta as CustomColumnMeta)
                        ?.className as string,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() =>
                    router.push(`/exercise/detail/${row.original._id}`)
                  }
                  className="cursor-pointer hover:bg-secondary-light/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={twMerge(
                        'text-center',
                        (cell.column.columnDef.meta as CustomColumnMeta)
                          ?.className,
                        'py-4',
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-2 h-16">
                  등록된 운동 기록이 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ContentBox>
      <div className="pt-8 h-6 flex flex-row justify-end gap-2 items-center">
        {exerciseData && exerciseData?.currentPage > 0 && (
          <Button
            className="bg-white h-6 flex items-center justify-center w-6 rounded-md cursor-pointer"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1 || !exerciseData}
          >
            <LeftArrowIcon />
          </Button>
        )}
        {Array.from({ length: exerciseData?.totalPages ?? 0 }, (_, i) => (
          <p
            key={i + 1}
            className={twMerge(
              `border-1 border-gray-light w-7 text-center rounded-md cursor-pointer ${exerciseData?.currentPage === i + 1 ? 'bg-primary/25' : 'bg-white'}`,
            )}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </p>
        ))}
        {exerciseData && exerciseData?.currentPage > 0 && (
          <Button
            className="bg-white h-6 flex items-center justify-center w-6 rounded-md cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= (exerciseData?.totalPages ?? 1)}
          >
            <RightArrowIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExerciseTable;
