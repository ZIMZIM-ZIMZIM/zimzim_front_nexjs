'use client';

import React, { ElementType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface MenuItemProps {
  to: string;
  Icon: ElementType;
  title: string;
  id: string;
}

const MenuItem = ({ to, Icon, title, id }: MenuItemProps) => {
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
          <Icon
            className={clsx(
              'group-hover:text-white w-7 h-7 md:w-5 md:h-5 lg:w-7 lg:h-7',
              {
                'text-white': isActive,
                'text-gray-600': !isActive,
              },
            )}
            width={24}
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
