import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDesktop from './components/NavbarDesktop'
import NavbarMobile from './components/NavbarMobile'

const AppLayout = () => {
  return (
    <div>
      <NavbarDesktop />
      <NavbarMobile />
      <Outlet />
    </div>
  );
};

export default React.memo(AppLayout);