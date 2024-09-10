import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

const Header = ({ children, className = '' }: HeaderProps) => (
  <header
    className={twMerge(
      `bg-gradient-to-r from-secondary-light to-[#8d98c4] h-20 w-full flex items-center px-8 justify-between ${className}`,
    )}
  >
    <div className="flex flex-row items-center w-40 justify-center">
      <Link href="/">
        <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
      </Link>
    </div>
    {children}
  </header>
);

export default Header;
