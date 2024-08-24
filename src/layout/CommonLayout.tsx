import React from 'react';

import Header from '#/components/common/header/Header';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-bg-light to-bg-dark px-16 pt-10 pb-14">
      <Header />
      <Outlet />
    </div>
  );
};

export default CommonLayout;
