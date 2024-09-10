'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname, useRouter } from 'next/navigation';
import { memo, ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import Modal from '#/components/common/Modal';

import { LOCAL_STORAGE } from '#/constants/key';
import { LANGUAGE } from '#/constants/option';
import ROUTE from '#/constants/route';

import i18n from '../../i18n';

import { ModalProvider, useModal } from '#/app/ModalContext';

const queryClient = new QueryClient();

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let locale = 'ko';

    const langluage = localStorage.getItem(LOCAL_STORAGE.LANGUAGE);
    const isLogin = localStorage.getItem(LOCAL_STORAGE.LOGIN);

    if (langluage) {
      locale = langluage;
    } else {
      localStorage.setItem(LOCAL_STORAGE.LANGUAGE, locale);
    }

    i18n.changeLanguage(locale);

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

    if (!LANGUAGE.includes(currentLocale)) {
      router.replace(`/${locale}${pathname}`);
    }

    setIsReady(true);
  }, [pathname, router]);

  if (!isReady) {
    return null;
  }

  const ModalManager = () => {
    const { modals, deleteModal } = useModal();

    const ModalItem = memo(
      ({
        id,
        component,
        closeModal,
      }: {
        id: string;
        component: ReactNode;
        closeModal: () => void;
      }) => {
        return (
          <Modal key={id} closeModal={closeModal}>
            {component}
          </Modal>
        );
      },
    );

    return (
      <>
        {modals.length > 0 && (
          <>
            {modals.map((modal) => (
              <ModalItem
                key={modal.id}
                id={modal.id}
                component={modal.component}
                closeModal={() => deleteModal(modal.id)}
              />
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
          <ModalManager />
        </ModalProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
