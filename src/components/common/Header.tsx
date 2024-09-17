import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

const Header = ({ children, className = '' }: HeaderProps) => (
  <header
    className={twMerge(
      `bg-gradient-to-r from-secondary-light to-[#8d98c4] pr-8 justify-between ${className}`,
    )}
  >
    {children}
  </header>
);

export default Header;
