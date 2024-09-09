import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '#components/common/Button';

const SocialLoginButton = () => {
  const { t } = useTranslation('common');

  return (
    <section
      className="flex flex-row gap-4 justify-between"
      aria-labelledby="social-login"
    >
      <h2 id="social-login" className="sr-only">
        Social Login Options
      </h2>
      {['Google', 'Apple'].map((ele: string) => (
        <Button
          key={ele}
          className="px-4 flex flex-1 flex-row items-center gap-2 border-1 border-gray-light h-12 rounded-lg text-black text-sm text-left"
          aria-label={t(`AUTH.LOGIN.SOCIAL_LOGIN.${ele.toUpperCase()}`)}
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
    </section>
  );
};

export default SocialLoginButton;
