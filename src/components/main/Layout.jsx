import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from './TopMenu';

const Layout = () => {
  return (
    <div className="">
      <TopMenu />
      <main className=" mx-auto max-w-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
