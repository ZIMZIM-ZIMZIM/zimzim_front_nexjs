import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '#/components/common/input/Input';
import CharacterModal from '#/components/profile/CharacterModal';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import useEnterKeyDown from '#/hooks/useEnterKeyDown';

import { User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import { MODAL } from '#/constants/key';
import QUERY_KEYS from '#/constants/queryKey';

import { useModal } from '#/app/ModalContext';

interface ProfileHeaderProps {
  userNickname: User['nickname'];
  exerciseDataCount: number;
}

const ProfileHeader = ({
  userNickname,
  exerciseDataCount,
}: ProfileHeaderProps) => {
  const [nickname, setNickname] = useState<string>(userNickname);
  const [isEidtNickname, setIsEditNickname] = useState<boolean>(false);

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { createModal } = useModal();

  const { mutate } = useCustomMutation<
    unknown,
    Error,
    {
      weight?: number | string;
      height?: number | string;
      nickname?: string;
    }
  >(API_ENDPOINT.USER.INFO, 'post');

  const { handleKeyDown } = useEnterKeyDown();

  return (
    <section className="flex flex-col items-center w-full gap-4">
      <div
        className="bg-primary/50 rounded-full w-28 h-28 relative flex items-center justify-center border-1 border-gray-dark/50 shadow-sm shadow-gray-dark cursor-pointer hover:bg-primary/75"
        onClick={() =>
          createModal({
            id: MODAL.CHARACTER,
            component: (
              <CharacterModal
                nickname={userNickname}
                count={exerciseDataCount}
              />
            ),
          })
        }
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
        {!isEidtNickname && <p>{userNickname}</p>}
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
              placeholder={t('PROFILE.NICKNAME.PLACEHOLDER')}
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
  );
};

export default ProfileHeader;
