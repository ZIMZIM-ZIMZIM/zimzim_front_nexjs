import ClientProvider from './ClientProvider';

export const metadata = {
  title: 'ZIMZIM',
  description: 'Exercise saves you',
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
