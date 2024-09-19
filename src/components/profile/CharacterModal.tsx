import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { User } from '#/api/type';

import { MODAL } from '#/constants/key';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

import { useModal } from '#/app/ModalContext';

interface CharacterModalProps {
  count: number;
  nickname: User['nickname'];
}

const CharacterModal = ({ count, nickname }: CharacterModalProps) => {
  const { i18n, t } = useTranslation();
  const { deleteModal } = useModal();

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex items-center gpa-8 justify-evenly">
        <Image
          src="/image/characters/baby.png"
          width={40}
          height={40}
          alt="baby"
        />
        <Image
          src="/icon/triple-arrow.png"
          width={60}
          height={10}
          alt="arrow"
          className="h-12 animate-pulse"
        />
        <Image
          src="/image/characters/growing.png"
          width={40}
          height={40}
          alt="growing"
        />
        <Image
          src="/icon/triple-arrow.png"
          width={60}
          height={20}
          alt="arrow"
          className="h-12 animate-pulse"
        />
        <Image
          src="/image/characters/adult.png"
          width={40}
          height={40}
          alt="adult"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>
          {t('PROFILE.MODAL.CONTENT', {
            name: nickname,
            count: Math.floor(count % 5),
          })}
        </p>
        <p className="text-gray-dark text-xs">{t('PROFILE.MODAL.SUB')}</p>
      </div>
      <div className="flex justify-center">
        <Link
          onClick={() => deleteModal(MODAL.CHARACTER)}
          href={`/${i18n.language}${ROUTE.EXERCISE.POST}`}
          className={twMerge(
            PRIMARY_BUTTON,
            'w-52 flex justify-center items-center hover:bg-primary/75 animate-bounce',
          )}
        >
          {t('PROFILE.MODAL.BUTTON')}
        </Link>
      </div>
    </div>
  );
};

export default CharacterModal;
