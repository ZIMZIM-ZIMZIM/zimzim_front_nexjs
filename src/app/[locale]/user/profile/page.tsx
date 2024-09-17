'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';

import ContentBox from '#/components/common/ContentBox';
import Input from '#/components/common/input/Input';
import BMIChart from '#/components/profile/BMIChart';
import CharacterModal from '#/components/profile/CharacterModal';

import useBMICaculate from '#/hooks/useBMICalculate';
import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';
import useEnterKeyDown from '#/hooks/useEnterKeyDown';

import { Exercise, User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import { MODAL } from '#/constants/key';
import QUERY_KEYS from '#/constants/queryKey';

import { useModal } from '#/app/ModalContext';
import { getBMIPeriod } from '#/util';

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { createModal } = useModal();

  const [isEidtNickname, setIsEditNickname] = useState<boolean>(false);
  const [isEditHeight, setIsEditHeight] = useState<boolean>(false);
  const [isEditWeight, setIsEditWeight] = useState<boolean>(false);

  const { data: userInfo } = useCustomQuery<unknown, Error, User>(
    QUERY_KEYS.USER,
    API_ENDPOINT.USER.INFO,
  );

  const { data: exerciseData } = useCustomQuery<unknown, Error, Exercise[]>(
    QUERY_KEYS.EXERCISE.DEFAULT,
    `${API_ENDPOINT.EXERCISE.EXERCISE}?id=${userInfo?.id}`,
  );

  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [weight, setWeight] = useState(userInfo?.weight ?? '0');
  const [height, setHeight] = useState(userInfo?.height ?? '0');

  const { handleKeyDown } = useEnterKeyDown();

  const { mutate } = useCustomMutation<
    unknown,
    Error,
    {
      weight?: number | string;
      height?: number | string;
      nickname?: string;
    }
  >(API_ENDPOINT.USER.INFO, 'post');

  const { caculatedBMI } = useBMICaculate(
    userInfo?.weight ?? 0,
    userInfo?.height ?? 0,
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col items-center w-full gap-4">
        <div
          className="bg-primary/50 rounded-full w-28 h-28 relative flex items-center justify-center border-1 border-gray-dark/50 shadow-sm shadow-gray-dark cursor-pointer hover:bg-primary/75"
          onClick={() => {
            createModal({
              id: MODAL.CHARACTER,
              component: (
                <CharacterModal
                  nickname={userInfo?.nickname}
                  count={exerciseData?.length}
                />
              ),
            });
          }}
        >
          <Image
            src="/image/characters/baby.png"
            width={50}
            height={50}
            alt="character"
            className="absolute"
          />
        </div>
        <div className="flex gap-2 text-xl items-center h-8">
          {!isEidtNickname && <p>{userInfo?.nickname}</p>}
          {isEidtNickname && (
            <div className="flex gap-2 items-center">
              <Input
                inputClassName="h-8 w-[13.5rem]"
                onKeyDown={(e) => {
                  handleKeyDown(e, nickname, () => {
                    setIsEditNickname(false);
                    mutate(
                      { nickname: nickname },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: QUERY_KEYS.USER,
                          });
                        },
                      },
                    );
                  });
                }}
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          )}
          {!isEidtNickname && (
            <Image
              src="/icon/pencil.svg"
              width={16}
              height={16}
              alt="edit icon"
              onClick={() => setIsEditNickname(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </section>
      <ContentBox
        contentTitle="exercise data"
        className="rounded-2xl w-full gap-8"
      >
        <div className="flex justify-between items-center h-8">
          <p>키</p>

          <span className="flex justify-end items-center gap-2">
            {isEditHeight && (
              <Input
                inputClassName="h-8"
                placeholder="키를 입력하세요"
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
        <div className="flex justify-between items-center h-8">
          <p>몸무게</p>
          <span className="flex justify-end items-center gap-2">
            {isEditWeight && (
              <Input
                inputClassName="h-8"
                placeholder="몸무게를 입력하세요"
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
      </ContentBox>
      <ContentBox contentTitle="water data" className="rounded-2xl w-full">
        <div className="flex justify-between items-center h-8">
          <p>BMI</p>
          <p>{caculatedBMI}</p>
          <div>{getBMIPeriod(caculatedBMI)}</div>
          <BMIChart value={caculatedBMI} />
        </div>
        <div className="flex gap-8 items-center"></div>
      </ContentBox>
    </div>
  );
};

export default ProfilePage;
