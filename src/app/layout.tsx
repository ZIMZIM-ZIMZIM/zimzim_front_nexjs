import localFont from 'next/font/local';

import ClientProvider from './ClientProvider';

import '../styles/index.css';

export const metadata = {
  title: 'ZIMZIM',
  description: 'Record your workouts. Exercise saves you',
  icons: {
    icon: '/icon/icon.svg',
  },
  openGraph: {
    images: [''],
    title: 'ZIMZIM',
    description: 'Record your workouts. Exercise saves you.',
  },
};

const roboto = localFont({
  src: [
    {
      path: '../fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto-Medium.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html lang={locale} dir="ltr">
      <body className={roboto.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
