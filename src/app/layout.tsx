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
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
