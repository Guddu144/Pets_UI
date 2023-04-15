import React, { useState, useContext, useEffect } from 'react'
import Dropdown from '../inputs/Dropdown';

const TopMenu = () => {

  return (
    <header className="py-3 px-[40px] bg-green-120  sticky top-0 h-auto z-50 ">

      <div className="flex w-full justify-between items-center content-center">
        <div className="">
          <a href="/">
            {/* <img className=" " /> */}
            <h1 className="text-white text-lg">PETS</h1>
          </a>
        </div>
        <div>
          <Dropdown
            menuButton={
              <div className="flex items-center bg-green-120 px-3 py-2">
                <div className="rounded-full h-7 w-7 mr-2">
                  <img className="h-7 w-7 rounded" />
                </div>
                <div className="text-left">
                  <label className="block text-sm text-white max-w-[110px] truncate pl-1 mr-2">Profile</label>
                </div>
              </div>
            } />
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
