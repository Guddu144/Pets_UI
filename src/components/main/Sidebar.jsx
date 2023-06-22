import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { classNames } from '../../utils';
import { Button, Dropdown, Icon } from '../inputs';
import logoIcon from '../../icons/Logo-white.svg';
import profileIcon from '../../icons/profile.svg';
import { IconLayoutDashboard, IconCircleDot, IconHistory, IconMapSearch, IconCirclePlus, IconCircleMinus, IconTargetArrow, IconUsers, IconCoinRupee, IconListDetails, IconAlertCircle, IconBell } from '@tabler/icons';

const useNavigation = () => {
  const loc = useLocation();
  const cur = loc.pathname;
  const isCurrent = path => path === cur;
  const links = [
    { name: 'Dashboard', href: '/', current: isCurrent('/'), icon: <IconLayoutDashboard color={isCurrent('/') ? '#e6ecf3' : '#8aa6c8'} className="mr-3.5" size={24} /> },
    { name: 'Notification', href: '/notification', current: isCurrent('/notification'), icon: <IconBell color={isCurrent('/notification') ? '#e6ecf3' : '#8aa6c8'} className="mr-3.5" size={24} /> },
    { name: 'Status', href: '/budget-status', current: isCurrent('/budget-status'), icon: <IconListDetails className="mr-3.5" color={isCurrent('/budget-status') ? '#e6ecf3' : '#8aa6c8'} size={24} /> },
    { name: 'Earnings', href: '/earning', current: isCurrent('/earning'), icon: <IconCirclePlus className="mr-3.5" color={isCurrent('/earning') ? '#e6ecf3' : '#8aa6c8'} size={24} />, heading: true, headingVal: 'Accounts' },
    { name: 'Expenses', href: '/expense', current: isCurrent('/expense'), icon: <IconCircleMinus className="mr-3.5" color={isCurrent('/expense') ? '#e6ecf3' : '#8aa6c8'} size={24} /> },
    { name: 'Transaction', href: '/transaction', current: isCurrent('/transaction'), icon: <IconCoinRupee color={isCurrent('/transaction') ? '#e6ecf3' : '#8aa6c8'} className="mr-3.5" size={22} />, heading: true, headingVal: 'Loans' },
    { name: 'Party', href: '/party', current: isCurrent('/party'), icon: <IconUsers className="mr-3.5" color={isCurrent('/party') ? '#e6ecf3' : '#8aa6c8'} size={24} /> },
    { name: 'Target', href: '/target', current: isCurrent('/target'), icon: <IconTargetArrow className="mr-3.5" color={isCurrent('/target') ? '#e6ecf3' : '#8aa6c8'} size={24} />, heading: true, headingVal: 'Target' },
    { name: 'Budget', href: '/budget', current: isCurrent('/budget'), icon: <IconTargetArrow className="mr-3.5" color={isCurrent('/budget') ? '#e6ecf3' : '#8aa6c8'} size={24} /> },

  ];

  return links.filter(ln => !ln.hidden);
};

const DesktopSidebar = ({ navigation }) => {
  // const { isEarningFormOpen, setIsEarningFormOpen } = useContext(FormContext)

  return (
    <div className="z-52 md:flex  md:w-[250px] md:flex-col md:fixed md:inset-y-0 overflow-y-auto">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col  border-r border-green-120 bg-green-120 px-5">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <div className="flex mt-3 justify-center items-center">
            {<Icon className=" h-6" icon={logoIcon} />}

          </div>
          <div className="mt-7">
            <Dropdown
              menuButton={
                <div className="flex items-center bg-green-120 px-3 py-2">
                  <div className="rounded-full h-7 w-7 mr-2">
                    {/* <img className="h-7 w-7 rounded" /> */}
                    {<Icon className="h-7 w-7 rounded" icon={profileIcon} />}

                  </div>
                  <div className="text-left">
                    <label className="block text-sm text-white max-w-[110px] truncate pl-1 mr-2">Profile</label>
                  </div>
                </div>
              } />
          </div>
          <nav className="mt-8">
            {navigation.map((item, index) => (
              <div key={index}>
                {item.heading ? <label className="block mt-6 mb-1 text-[10px] uppercase text-white tracking-wider">{item.headingVal}</label> : ''}
                <Link
                  key={item.name}
                  to={item.href}
                  title={item.name}
                  className={classNames(
                    item.current ? 'bg-[#00545c]' : '',
                    'group flex items-center p-3 text-sm font-normal mb-1 rounded-md text-blue-50 ',
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

        </div>
        <div className="flex-shrink-0 flex justify-between mb-10 mx-1">
          {/* <button><div className="rounded-full bg-green-600 text-white p-2"> <IconMinus /></div></button>
          <Button onClick={() => { setIsEarningFormOpen(true) }} >
            <div className="rounded-full bg-green-600 text-white p-2"><IconPlus /></div>
          </Button> */}

          {/* <div className="flex-shrink-0 w-full group block">
            <Footer />
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const navigation = useNavigation();
  return (
    <Transition
      show={true}
      enter="transition-opacity ease-linear duration-50"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DesktopSidebar navigation={navigation} />
    </Transition>
  );
};

export default Sidebar;
