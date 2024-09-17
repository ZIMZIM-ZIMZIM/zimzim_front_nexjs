import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { MODAL } from '#/constants/key';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

import { useModal } from '#/app/ModalContext';
import { User } from '#/api/type';

interface CharacterModalProps {
  count: number;
  nickname: User['nickname'];
}

const CharacterModal = ({ count, nickname }: CharacterModalProps) => {
  const { i18n } = useTranslation();
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
          {nickname}님, 다음 단계까지 {5 - count}번 남으셨어요.
        </p>
        <p className="text-gray-dark text-xs">
          * 운동기록을 5일 이상 기록하면 한 단계씩 성장합니다.
        </p>
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
          등록하기
        </Link>
      </div>
    </div>
  );
};

export default CharacterModal;
