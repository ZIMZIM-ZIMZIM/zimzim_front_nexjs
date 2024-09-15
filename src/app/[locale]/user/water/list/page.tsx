'use client';

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
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import ContentBox from '#/components/common/ContentBox';
import Pagination from '#/components/common/Pagination';
import Skeleton from '#/components/common/Skeleton';
import WaterRegisterForm, {
  WaterRegisterFormInput,
} from '#/components/water/WaterRegisterForm';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';

import API_ENDPOINT from '#/constants/api';
import { MODAL } from '#/constants/key';
import QUERY_KEYS from '#/constants/queryKey';
import { ACTION_BUTTON } from '#/constants/style';

import { useModal } from '#/app/ModalContext';
import { getKoreaDate } from '#/util';

interface CustomColumnMeta {
  className?: string;
}

const WaterListPage = () => {
  const queryClient = useQueryClient();
  const columnHelper = createColumnHelper();

  const { data, isLoading } = useCustomQuery(
    QUERY_KEYS.WATER.LIST(),
    API_ENDPOINT.WATER.LIST,
  );

  const [selectedId, setSelectedId] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const { createModal, deleteModal } = useModal();

  const { mutate } = useCustomMutation<{}, Error, WaterRegisterFormInput>(
    API_ENDPOINT.WATER.UPDATE(selectedId),
    'post',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WATER.LIST() });
        deleteModal(MODAL.WATER.UPDATE);
      },
    },
  );

  const { mutate: deleteWater } = useCustomMutation<{}, Error, { id: string }>(
    (variables) => `${API_ENDPOINT.WATER.DELETE}/${variables.id}`,
    'delete',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WATER.LIST() });
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
        header: () => 'Date',
        meta: { className: 'w-1/6 text-left' },
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        header: () => 'Amount(ml)',
        cell: ({ row, getValue }) => (
          <div className="flex flex-row gap-4">
            {getValue() + 'ml'}
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
    [checkedList, data, setCheckedList],
  );

  const { mutate: registerWater } = useCustomMutation(
    API_ENDPOINT.WATER.POST,
    'post',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WATER.LIST() });
        deleteModal(MODAL.WATER.REGISTER);
      },
    },
  );

  const table = useReactTable({
    data: data?.item ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const waterRegisterModal = () => {
    createModal({
      id: MODAL.WATER.REGISTER,
      component: (
        <WaterRegisterForm
          defaultValue={{
            date: getKoreaDate(),
            amount: '',
          }}
          mutate={registerWater}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="w-4/5 text-right">
        <Button
          className={twMerge(ACTION_BUTTON, 'bg-primary')}
          onClick={waterRegisterModal}
        >
          등록
        </Button>
      </div>
      <div className="w-4/5 flex flex-col gap-8">
        <div className="flex flex-col">
          <ContentBox
            className="rounded-2xl w-full py-4"
            contentTitle="exercise-table"
          >
            {isLoading ? (
              <Skeleton
                theadNumber={5}
                tbodyRowNumber={5}
                tbodyCellNumber={5}
              />
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
                      <td
                        colSpan={columns.length}
                        className="text-center py-2 h-16"
                      >
                        등록된 음수량 기록이 없습니다
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </ContentBox>

          {data && <Pagination data={data} page={page} setPage={setPage} />}
        </div>
      </div>
    </div>
  );
};

export default WaterListPage;
