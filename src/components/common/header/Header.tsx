import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ROUTE from '#/constants/route';

const Header = () => (
  <header>
    <div className="w-16">
      <Link href={ROUTE.MAIN_PAGE}>
        <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
      </Link>
    </div>
  </header>
);

export default Header;
