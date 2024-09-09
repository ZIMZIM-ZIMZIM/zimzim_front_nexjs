'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import ROUTE from '#/constants/route';

import i18n from '../../i18n';

const queryClient = new QueryClient();

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let locale = 'ko';

    const langluage = localStorage.getItem('ZimZimLang');
    const isLogin = localStorage.getItem('ZimZimLogin');

    if (langluage) {
      locale = langluage;
    } else {
      localStorage.setItem('ZimZimLangauge', locale);
    }

    if (pathname === '/') {
      if (isLogin) {
        router.replace(`/${locale}${ROUTE.MAIN_PAGE}`);
      } else {
        router.replace(`/${locale}${ROUTE.LOGIN}`);
      }

      return;
    }

    if (pathname.includes('user')) {
      if (isLogin) {
        router.replace(pathname);
      } else {
        router.replace(`/${locale}${ROUTE.LOGIN}`);
      }
    }

    const currentLocale = pathname.split('/')[1];

    if (!['en', 'ko'].includes(currentLocale)) {
      router.replace(`/${locale}${pathname}`);
    }

    setIsReady(true);
  }, [pathname, router]);

  if (!isReady) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </I18nextProvider>
  );
}
