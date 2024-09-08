'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

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

    if (pathname === '/') {
      router.replace(`/${locale}/auth/login`);
      return;
    }

    const browserLanguage = navigator.language.split('-')[0];
    if (['en', 'ko'].includes(browserLanguage)) {
      locale = browserLanguage;
    }

    if (!pathname.startsWith(`/${locale}`)) {
      router.replace(`/${locale}${pathname}`);
      return;
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
