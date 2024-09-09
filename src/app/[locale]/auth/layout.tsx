import React, { ReactNode } from 'react';

import Header from '#components/common/header/Header';

const CommonLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-secondary-light to-secondary-dark px-16 pt-8">
      {children}
    </main>
  </>
);

export default CommonLayout;
