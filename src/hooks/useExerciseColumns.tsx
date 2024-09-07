import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { ColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { FlattenedExercise } from '#/components/exercise/list/ExerciseTable';

const toggleRowSelected = (
  id: string,
  setCheckedExercise: Dispatch<SetStateAction<string[]>>,
) => {
  setCheckedExercise((prev: string[]) =>
    prev.includes(id)
      ? prev.filter((rowId: string) => rowId !== id)
      : [...prev, id],
  );
};

export const useGetExerciseColumns = (
  columnHelper: ColumnHelper<FlattenedExercise>,
  flattenedData: FlattenedExercise[],
  checkedExercise: string[],
  setCheckedExercise: Dispatch<SetStateAction<string[]>>,
) => {
  const colums = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => (
          <input
            type="checkbox"
            checked={
              flattenedData.length > 0 &&
              checkedExercise.length === flattenedData.length
            }
            onChange={(e) => {
              const checked = e.target.checked;

              if (checked) {
                setCheckedExercise(
                  flattenedData.flatMap((row) => row._id as string),
                );
              } else {
                setCheckedExercise([]);
              }
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={
              row.original._id
                ? checkedExercise.includes(row.original._id)
                : false
            }
            onChange={() =>
              row.original._id
                ? toggleRowSelected(row.original._id, setCheckedExercise)
                : null
            }
          ></input>
        ),
        meta: { className: 'w-1/12 text-left pl-4' },
      }),
      columnHelper.accessor('date', {
        id: 'date',
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD'),
        header: () => '날짜',
        meta: { className: 'w-1/6 text-left' },
      }),
      columnHelper.accessor('isPT', {
        id: 'isPT',
        header: () => 'PT 여부',
        cell: (info) => (
          <span>{info.getValue() === 'Y' ? 'PT' : '개인운동'}</span>
        ),
        meta: { className: 'w-1/6 text-right' },
      }),
      columnHelper.accessor('type', {
        id: 'type',
        header: () => '종류',
        cell: (info) => info.renderValue(),
        meta: { className: 'w-1/6 text-right' },
      }),
      columnHelper.accessor('duration', {
        id: 'duration',
        header: () => '시간(분)',
        cell: (info) => info.renderValue() + '분',
        meta: { className: 'w-1/6 text-right' },
      }),
      columnHelper.accessor('force', {
        id: 'force',
        header: () => '강도',
        cell: (info) => info.renderValue(),
        meta: { className: 'w-1/6 text-right pr-4' },
      }),
    ],
    [columnHelper, flattenedData, checkedExercise, setCheckedExercise],
  );

  return colums;
};
