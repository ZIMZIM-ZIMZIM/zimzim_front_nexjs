'use client';
import React from 'react';

import MenuItem from '#components/common/menu/MenuItem';

import ROUTE from '#/constants/route';

import ChartIcon from 'public/icon/chart.svg';
import ExerciseIcon from 'public/icon/exercise.svg';
import WaterIcon from 'public/icon/water.svg';

const Menu = () => (
  <header className="w-48 justify-center algin-center border-b-1 border-slate-900/10 bg-white">
    <nav className="h-full flex flex-col gap-6 pt-4 items-center">
      <div className="flex flex-col gap-8 w-5/6 text-gray-600 max-md:items-center">
        <MenuItem
          to={ROUTE.MAIN_PAGE}
          title="Dashboard"
          Icon={ChartIcon}
          id="/user/dashboard"
        />
        <MenuItem
          to={ROUTE.EXERCISE.DEFAULT}
          title="Exercise"
          Icon={ExerciseIcon}
          id="/user/exercise"
        />
        <MenuItem
          to={ROUTE.WATER}
          title="Water"
          Icon={WaterIcon}
          id="/user/water"
        />
      </div>
    </nav>
  </header>
);

export default Menu;
