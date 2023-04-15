import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Checkbox, PlainButton } from '../inputs';

import { IconFilter } from '@tabler/icons';

/**
 *  sample filters array
 *  note that body and filters should be mutually exclusive
 *
 *  [
 *    {
 *      id: 'group-1',
 *      label: 'Group 1',
 *      value?: 'custom input value',
 *      body?: <full jsx component>,
 *      filters?: [
 *        {
 *          id: 'filter-1',
 *          label: 'Filter 1',
 *          active: true,
 *          onClick: () => { ... }
 *        }
 *      ]
 *    }
 *  ]
 */

const Filter = ({ filters }) => {
  const [expanded, setExpanded] = useState({});

  const handleExpand = group => {
    setExpanded({
      ...expanded,
      [group]: true,
    });
  };

  return (
    <Popover as="div" className="relative hidden sm:inline-block">
      <div>
        <Popover.Button
          as={PlainButton}
          className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md mx-2 bg-white"
        >
          <div className="flex p-0">
            <IconFilter size={'20px'} />
            <label className="ml-1 text-sm">Filter</label>
          </div>
        </Popover.Button>
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
        <Popover.Panel className="pb-2 z-10 origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-clip">
          {filters.map(group => {
            const shouldHide = Boolean(!group.body && group.filters?.length > 4);
            const hasFilters = Boolean(!group.body && group.filters);
            const isHidden = Boolean(shouldHide && !expanded[group.id]);
            return (
              <div key={group.id}>
                <h1 className="bg-gray-50 p-2 px-2.5 text-sm font-medium text-gray-600">
                  {group.label}
                </h1>
                <div className="mx-4 my-3 space-y-2">
                  {group.body}
                  {hasFilters && group.filters.map((filter, i) => {
                    if (shouldHide && isHidden && i > 3) {
                      return null;
                    }
                    return (
                      <div key={filter.id} className="flex space-x-3 items-center">
                        <Checkbox checked={filter.active} onChange={e => filter.onClick(e.target.checked)} />
                        <span className="text-sm text-gray-700">
                          {filter.label}
                        </span>
                      </div>
                    );
                  })}
                  {hasFilters && isHidden && (
                    <div className="flex justify-end">
                      <PlainButton className="text-xs" onClick={() => handleExpand(group.id)}>
                        {('...expand')}
                      </PlainButton>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="float-right">
            <button className="border rounded-md mr-4 text-xs bg-blue-500 text-white p-2 hover:bg-blue-900">Clear</button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Filter;
