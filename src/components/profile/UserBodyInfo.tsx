import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentBox from '#/components/common/ContentBox';
import Input from '#/components/common/input/Input';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import useEnterKeyDown from '#/hooks/useEnterKeyDown';

import { Exercise, User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import QUERY_KEYS from '#/constants/queryKey';

interface UserBodyInfoProps {
  userInfo?: User;
  exerciseData?: Exercise[];
}

const UserBodyInfo = ({ userInfo, exerciseData }: UserBodyInfoProps) => {
  const { t } = useTranslation();

  const { handleKeyDown } = useEnterKeyDown();

  const queryClient = useQueryClient();

  const [weight, setWeight] = useState<string>(userInfo?.weight ?? '0');
  const [height, setHeight] = useState<string>(userInfo?.height ?? '0');

  const [isEditHeight, setIsEditHeight] = useState<boolean>(false);
  const [isEditWeight, setIsEditWeight] = useState<boolean>(false);

  const { mutate } = useCustomMutation<
    unknown,
    Error,
    {
      weight?: string;
      height?: string;
      nickname?: string;
    }
  >(API_ENDPOINT.USER.INFO, 'post');

  return (
    <ContentBox
      contentTitle="exercise data"
      className="rounded-2xl w-full gap-8"
    >
      <div className="flex justify-between items-center h-8">
        <p>{t('PROFILE.HEIGHT.HEIGHT')}</p>

        <span className="flex justify-end items-center gap-2">
          {isEditHeight && (
            <Input
              inputClassName="h-8"
              placeholder={t('PROFILE.HEIGHT.PLACEHOLDER')}
              onChange={(e) => setHeight(e.target.value)}
              onKeyDown={(e) =>
                handleKeyDown(e, height, () => {
                  setIsEditHeight(false);
                  mutate(
                    { height: height },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: QUERY_KEYS.USER,
                        });
                      },
                    },
                  );
                })
              }
            />
          )}
          {!isEditHeight && (
            <>
              <p>{userInfo?.height ?? ''}cm</p>
              <Image
                src="/icon/pencil.svg"
                width={16}
                height={16}
                alt="edit icon"
                onClick={() => setIsEditHeight(true)}
                className="cursor-pointer"
              />
            </>
          )}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p>{t('PROFILE.WEIGHT.WEIGHT')}</p>
        <span className="flex justify-end items-center gap-2">
          {isEditWeight && (
            <Input
              inputClassName="h-8"
              placeholder={t('PROFILE.WEIGHT.PLACEHOLDER')}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={(e) =>
                handleKeyDown(e, weight, () => {
                  setIsEditWeight(false);
                  mutate(
                    { weight: weight },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: QUERY_KEYS.USER,
                        });
                      },
                    },
                  );
                })
              }
            />
          )}
          {!isEditWeight && (
            <>
              <p>{userInfo?.weight ?? ''}kg</p>
              <Image
                src="/icon/pencil.svg"
                width={16}
                height={16}
                alt="edit icon"
                onClick={() => setIsEditWeight(true)}
                className="cursor-pointer"
              />
            </>
          )}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p>{t('PROFILE.TOTAL_COUNT.TOTAL')}</p>
        <p>
          {t('PROFILE.TOTAL_COUNT.COUNT', {
            count: exerciseData?.length || 0,
          })}
        </p>
      </div>
    </ContentBox>
  );
};

export default UserBodyInfo;
