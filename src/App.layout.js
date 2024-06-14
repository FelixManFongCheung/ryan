import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar_desktop from './components/Navbar-desktop'
import Navbar_mobile from './components/Navbar-mobile'

const AppLayout = () => {
  return (
    <div>
      <Navbar_desktop />
      <Navbar_mobile />
      <Outlet />
    </div>
  );
};

export default React.memo(AppLayout);