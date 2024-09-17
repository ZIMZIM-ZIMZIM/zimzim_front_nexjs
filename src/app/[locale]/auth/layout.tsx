import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import Header from '#/components/common/Header';

const CommonLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header>
      <div className="w-[12rem] flex justify-center items-center h-20">
        <Link href="/">
          <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
        </Link>
      </div>
    </Header>
    <main className="min-h-full bg-gradient-to-br from-secondary-light to-secondary-dark pt-8 min-h-[calc(100vh-5rem)]">
      {children}
    </main>
  </>
);

export default CommonLayout;
