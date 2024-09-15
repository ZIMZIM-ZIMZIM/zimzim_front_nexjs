'use client';

import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import Pagination from '#/components/common/Pagination';
import WaterRegisterForm, {
  WaterRegisterFormInput,
} from '#/components/water/WaterRegisterForm';
import WaterTable from '#/components/water/WaterTable';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';

import API_ENDPOINT from '#/constants/api';
import { MODAL } from '#/constants/key';
import QUERY_KEYS from '#/constants/queryKey';
import { ACTION_BUTTON } from '#/constants/style';

import { useModal } from '#/app/ModalContext';
import { getKoreaDate } from '#/util';

interface WaterRecord {
  _id: string;
  date: string;
  amount: number;
}

const WaterListPage = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const { createModal, deleteModal } = useModal();

  const { data, isLoading } = useCustomQuery<{
    item: WaterRecord[];
    currentPage: number;
    totalPages: number;
  }>(QUERY_KEYS.WATER.LIST(), API_ENDPOINT.WATER.LIST);

  const { mutate: registerWater } = useCustomMutation<
    WaterRegisterFormInput,
    Error,
    WaterRegisterFormInput
  >(API_ENDPOINT.WATER.POST, 'post', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WATER.LIST() });
      deleteModal(MODAL.WATER.REGISTER);
    },
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
          {t('WATER.REGISTER')}
        </Button>
      </div>
      <div className="w-4/5 flex flex-col gap-8">
        <div className="flex flex-col">
          <WaterTable data={data} isLoading={isLoading} />
          {data && <Pagination data={data} page={page} setPage={setPage} />}
        </div>
      </div>
    </div>
  );
};

export default WaterListPage;
