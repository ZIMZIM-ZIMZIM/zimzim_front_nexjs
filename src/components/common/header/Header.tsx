import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => (
  <header className="bg-gradient-to-r from-secondary-light to-[#8d98c4] h-20 w-full flex items-center px-8">
    <div className="w-16">
      <Link href="/">
        <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
      </Link>
    </div>
  </header>
);

export default Header;
