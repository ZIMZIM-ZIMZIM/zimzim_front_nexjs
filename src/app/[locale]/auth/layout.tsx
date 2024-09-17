import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import Header from '#/components/common/Header';

const CommonLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header>
      <div className="px-16 flex items-center h-20">
        <Link href="/">
          <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
        </Link>
      </div>
    </Header>
    <main className="bg-gradient-to-br from-secondary-light to-secondary-dark pt-8 h-[calc(100vh-5rem)]">
      {children}
    </main>
  </>
);

export default CommonLayout;
