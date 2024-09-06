import ClientProvider from './ClientProvider';
import '../styles/index.css';

export const metadata = {
  title: 'ZIMZIM',
  description: 'Exercise saves you',
  icons: {
    icon: '/icon/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
