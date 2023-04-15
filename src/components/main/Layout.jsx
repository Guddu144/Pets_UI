import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopMenu from './TopMenu';

const Layout = ({ children }) => {
  return (
    <div className="">
      {/* <TopMenu /> */}
      <Sidebar />
      <main className=" mx-auto max-w-screen pl-[250px]">
        {children}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
