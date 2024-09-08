import ClientProvider from './ClientProvider';
import '../../styles/index.css';
import { dir } from 'i18next';

export const metadata = {
  title: 'ZIMZIM',
  description: 'Exercise saves you',
  icons: {
    icon: '/icon/icon.svg',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
