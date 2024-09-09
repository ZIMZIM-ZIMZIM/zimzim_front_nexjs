import React, { ReactNode } from 'react';

import UserHeader from '#components/common/header/UserHeader';
import Menu from '#components/common/menu/Menu';

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-screen flex flex-col bg-secondary-light/50">
      <UserHeader />
      <div className="flex flex-1 overflow-hidden">
        <Menu />
        <section className="flex-1 overflow-auto p-6">{children}</section>
      </div>
    </main>
  );
};

export default UserLayout;
