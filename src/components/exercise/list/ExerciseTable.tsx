'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import ContentBox from '#/components/common/ContentBox';
import Pagination from '#/components/common/Pagination';
import Skeleton from '#/components/common/Skeleton';

import { useCustomQuery } from '#/hooks/useCustomQuery';
import { useGetExerciseColumns } from '#/hooks/useExerciseColumns';

import { Exercise, ExerciseDetail, ExerciseList, User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import QUERY_KEYS from '#/constants/queryKey';

export type FlattenedExercise = Pick<Exercise, 'date' | 'isPT'> &
  Pick<Exercise['detail'][number], 'type' | 'duration' | 'force' | '_id'>;

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
  const { i18n } = useTranslation();
  const router = useRouter();
  const columnHelper = createColumnHelper<FlattenedExercise>();

  const { data: userInfo } = useCustomQuery<User>(
    QUERY_KEYS.USER,
    API_ENDPOINT.USER.INFO,
  );

  const { data: exerciseData, isLoading } = useCustomQuery<ExerciseList>(
    QUERY_KEYS.EXERCISE.LIST(),
    `${API_ENDPOINT.EXERCISE.LIST}?id=${userInfo?.id}&page=${page}&limit=5`,
  );

  const [flattenedData, setFlattenData] = useState<FlattenedExercise[] | []>(
    [],
  );

  useEffect(() => {
    if (exerciseData?.items) {
      setFlattenData(
        exerciseData.items.flatMap((exercise: Exercise) =>
          exercise.detail.map((element: ExerciseDetail) => ({
            _id: element._id,
            date: exercise.date,
            type: element.type,
            force: element.force,
            duration: element.duration,
            isPT: exercise.isPT,
          })),
        ),
      );
    }
  }, [exerciseData]);

  const columns = useGetExerciseColumns(
    columnHelper,
    flattenedData,
    checkedExercise,
    setCheckedExercise,
  );

  const table = useReactTable({
    data: flattenedData ?? [],
    columns: columns as ColumnDef<FlattenedExercise>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <ContentBox
        className="rounded-2xl w-full py-4"
        contentTitle="exercise-table"
      >
        {isLoading ? (
          <Skeleton theadNumber={5} tbodyRowNumber={5} tbodyCellNumber={5} />
        ) : (
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
                      router.push(
                        `/${i18n.language}/user/exercise/detail/${row.original._id}`,
                      )
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
                  <td
                    colSpan={columns.length}
                    className="text-center py-2 h-16"
                  >
                    등록된 운동 기록이 없습니다
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </ContentBox>

      {exerciseData && (
        <Pagination data={exerciseData} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default ExerciseTable;
