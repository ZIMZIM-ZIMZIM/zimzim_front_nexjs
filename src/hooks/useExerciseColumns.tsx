import { ColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');

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
        header: () => t('EXERCISE.TABLE.COLUMN.DATE'),
        meta: { className: 'w-1/6 text-left' },
      }),
      columnHelper.accessor('isPT', {
        id: 'isPT',
        header: () => t('EXERCISE.TABLE.COLUMN.PT'),
        cell: (info) => (
          <span>
            {info.getValue() === 'Y'
              ? t('EXERCISE.TABLE.ROW.PT')
              : t('EXERCISE.TABLE.ROW.FREE_EXERCISE')}
          </span>
        ),
        meta: { className: 'w-1/6 text-right' },
      }),
      columnHelper.accessor('type', {
        id: 'type',
        header: () => t('EXERCISE.TABLE.COLUMN.TYPE'),
        cell: (info) => info.renderValue(),
        meta: { className: 'w-1/6 text-right' },
      }),
      columnHelper.accessor('duration', {
        id: 'duration',
        header: () => t('EXERCISE.TABLE.COLUMN.MIN'),
        cell: (info) => info.renderValue() ?? '' + t('EXERCISE.TABLE.ROW.TIME'),
        meta: { className: 'w-1/6 text-right' },
      }),
      columnHelper.accessor('force', {
        id: 'force',
        header: () => t('EXERCISE.TABLE.COLUMN.FORCE'),
        cell: (info) => info.renderValue(),
        meta: { className: 'w-1/6 text-right pr-4' },
      }),
    ],
    [columnHelper, flattenedData, checkedExercise, setCheckedExercise],
  );

  return colums;
};
