import ClientProvider from './ClientProvider';
import '../styles/index.css';

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
    <html lang={locale} dir="ltr">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
