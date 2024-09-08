'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

interface MenuItemProps {
  to: string;
  icon: string;
  title: string;
  id: string;
}

const MenuItem = ({ to, icon, title, id }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(id);

  return (
    <Link
      href={to}
      className={clsx(
        'group flex flex-row h-12 p-2 items-center gap-3 rounded-lg max-md:px-4',
        {
          'bg-secondary-light text-white shadow-lg shadow-secondary-light/50':
            isActive,
          'hover:bg-secondary-light/70 hover:text-white text-gray-600':
            !isActive,
        },
      )}
    >
      {
        <>
          <Image
            className={clsx(
              'group-hover:text-white w-7 h-7 md:w-5 md:h-5 lg:w-7 lg:h-7',
              {
                'text-white': isActive,
                'text-gray-600': !isActive,
              },
            )}
            src={icon}
            width={24}
            alt="icon"
            height={24}
          />

          <p className="text-xl md:text-sm hidden md:block lg:text-lg">
            {title}
          </p>
        </>
      }
    </Link>
  );
};

export default MenuItem;
