import { useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import ContentBox from '#/components/common/ContentBox';
import Skeleton from '#/components/common/Skeleton';
import WaterRegisterForm, {
  WaterRegisterFormInput,
} from '#/components/water/WaterRegisterForm';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import { MODAL } from '#/constants/key';
import QUERY_KEYS from '#/constants/queryKey';

import { useModal } from '#/app/ModalContext';

interface CustomColumnMeta {
  className?: string;
}

interface WaterRecord {
  _id: string;
  date: string;
  amount: number;
}

const WaterTable = ({ data, isLoading }) => {
  const { t } = useTranslation();

  const [selectedId, setSelectedId] = useState<string>('');

  const queryClient = useQueryClient();

  const { createModal, deleteModal } = useModal();

  const columnHelper = createColumnHelper<WaterRecord>();

  const { mutate: deleteWater } = useCustomMutation<
    unknown,
    Error,
    { id: string }
  >((variables) => `${API_ENDPOINT.WATER.DELETE}/${variables.id}`, 'delete', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WATER.LIST() });
    },
  });

  const { mutate } = useCustomMutation<unknown, Error, WaterRegisterFormInput>(
    API_ENDPOINT.WATER.UPDATE(selectedId),
    'post',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WATER.LIST() });
        deleteModal(MODAL.WATER.UPDATE);
      },
    },
  );

  const updateWaterModal = ({ date, amount, id }) => {
    setSelectedId(id);

    createModal({
      id: MODAL.WATER.UPDATE,
      component: (
        <WaterRegisterForm
          defaultValue={{
            date: date,
            amount: amount,
          }}
          id={id}
          mutate={mutate}
        />
      ),
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        id: 'date',
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD'),
        header: () => t('WATER.TABLE.DATE'),
        meta: { className: 'w-1/6 text-left' },
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        header: () => `${t('WATER.TABLE.AMOUNT')}(${t('WATER.UNIT')})`,
        cell: ({ row, getValue }) => (
          <div className="flex flex-row gap-4">
            {getValue() + t('WATER.UNIT')}
            <Image
              src="/icon/pencil.svg"
              width={20}
              height={20}
              alt="pencil"
              className="cursor-pointer"
              onClick={() =>
                updateWaterModal({
                  id: row.original._id,
                  date: dayjs(row.original.date).format('YYYY-MM-DD'),
                  amount: getValue(),
                })
              }
            />
          </div>
        ),
        meta: { className: 'w-1/6 text-left' },
      }),
      columnHelper.display({
        id: 'select',
        header: () => <></>,
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <Image
                src="/icon/trash.svg"
                width={20}
                height={20}
                alt="trash"
                className="cursor-pointer"
                onClick={() => deleteWater({ id: row.original._id })}
              />
            </div>
          );
        },
        meta: { className: 'w-1/12' },
      }),
    ],
    [data],
  );

  const table = useReactTable({
    data: data?.item ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
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
            {table.getRowModel()?.rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-secondary-light/20">
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
                  {t('WATER.TABLE.NO_DATA')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </ContentBox>
  );
};

export default WaterTable;
