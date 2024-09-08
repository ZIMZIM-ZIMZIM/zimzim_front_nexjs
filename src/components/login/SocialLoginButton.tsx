import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import Button from '#components/common/Button';

const SocialLoginButton = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-row gap-4 justify-between">
      {['Google', 'Apple'].map((ele: string) => (
        <Button
          key={ele}
          className="px-4 flex flex-1 flex-row items-center gap-2 border-1 border-gray-light h-12 rounded-lg text-black text-sm text-left"
        >
          {ele === 'Google' && (
            <Image
              src="/icon/google.svg"
              className="w-6 h-6"
              alt="google icon"
              width={20}
              height={20}
            />
          )}
          {ele === 'Apple' && (
            <Image
              src="/icon/apple.svg"
              className="w-6 h-6"
              alt="apple icon"
              width={20}
              height={20}
            />
          )}
          {t(`AUTH.LOGIN.SOCIAL_LOGIN.${ele.toUpperCase()}`)}
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginButton;
