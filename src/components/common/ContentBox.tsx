import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentBoxProps {
  children: ReactNode;
  className?: string;
  contentTitle: string;
}

const ContentBox = ({
  children,
  className = '',
  contentTitle,
}: ContentBoxProps) => (
  <section
    className={twMerge(
      `flex flex-col w-1/3 justify-between bg-white p-8 border-1 border-gray-light shadow-md shadow-gray-dark/25 ${className}`,
    )}
    aria-labelledby={contentTitle}
  >
    {children}
  </section>
);

export default ContentBox;
