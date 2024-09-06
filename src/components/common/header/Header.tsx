import React from 'react';
// import { NavLink } from 'react-router-dom';

// import CIIcon from '#assets/icon/icon.svg?react';
import ROUTE from '#/constants/route';
import Image from 'next/image';
import Link from 'next/link';

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
