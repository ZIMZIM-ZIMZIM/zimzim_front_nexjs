import React, { ReactNode } from 'react';

import Header from '#components/common/header/Header';

const CommonLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-screen bg-gradient-to-br from-secondary-light to-secondary-dark px-16 pt-8 flex flex-col justify-between gap-8">
    <Header />
    {children}
  </div>
);

export default CommonLayout;
