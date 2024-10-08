'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ROUTE from '#/constants/route';

import MenuItem from '#components/common/menu/MenuItem';

const Menu = () => {
  const { i18n } = useTranslation();

  return (
    <nav className=" justify-center algin-center border-b-1 border-slate-900/10 bg-white">
      <div className="h-full flex flex-col gap-6 items-center">
        <div className="flex flex-row gap-8 text-gray-600 max-md:items-center py-4">
          <MenuItem
            to={`/${i18n.language + ROUTE.MAIN_PAGE}`}
            title="Dashboard"
            icon="/icon/chart.svg"
            id="/user/dashboard"
          />
          <MenuItem
            to={`/${i18n.language + ROUTE.EXERCISE.DEFAULT}`}
            title="Exercise"
            icon="/icon/exercise.svg"
            id="/user/exercise"
          />
          <MenuItem
            to={`/${i18n.language + ROUTE.WATER.LIST}`}
            title="Water"
            icon="/icon/water.svg"
            id="/user/water"
          />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
