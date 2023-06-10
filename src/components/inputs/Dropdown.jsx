import React, { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../../utils";
import { Link, Navigate } from "react-router-dom";

const Dropdown = ({ menuButton }) => {
  const items = [
    { id: "1", label: "Profile", link: "/profile" },
    { id: "2", label: "Logout", link: "/login" },
  ];
  return (
    <div className="relative w-full">
      <Menu as="div" className="relative inline-block w-full">
        <div>
          <Menu.Button className="inline-flex w-full border justify-center rounded-md bg-black bg-opacity-20 p-2.5 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {menuButton}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-1 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-green-120 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {items.map((elem) => (
                <Menu.Item key={elem.id}>
                  <Link
                    key={elem.id}
                    to={elem.link}
                    title={elem.label}
                    className={classNames(
                      "group flex items-center p-3 text-sm font-normal mb-1 rounded-md text-blue-50 hover:bg-blue-900"
                    )}
                  >
                    {elem.label}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
