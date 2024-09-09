'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

interface MenuItemProps {
  to: string;
  icon: string;
  title: string;
  id: string;
}

const MenuItem = ({ to, icon, title, id }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(id);

  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {
        <>
          <Image
            src={icon}
            width={24}
            alt="icon"
            height={24}
            style={{
              filter:
                isActive || isHovered ? 'brightness(0) invert(1)' : 'none',
            }}
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
