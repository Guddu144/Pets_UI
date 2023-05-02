import React, { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import Icon from './Icon';

import chevronDownIcon from '../../icons/dropdown.svg';
import errorIcon from '../../icons/error-exclamation.svg';
import { classNames } from '../../utils';

const sizes = {
  'xs': 'px-2.5 py-1.5 text-xs',
  'sm': 'px-3 py-2 text-sm',
  'base': 'px-4 py-2',
  'lg': 'pr-3.5 py-3',
  'xl': 'px-6 py-3.5',
  'none': '',
};

const SelectBox = ({ items, value, onChange, placeholder, size = 'base', hasError }, ref) => {
  const selected = items.filter(item => item.id === value)[0];
  return (
    <Listbox ref={ref} value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className={classNames(
          'relative w-full cursor-default rounded-md bg-white border pr-10 text-left focus:outline-none focus:ring-1',
          sizes[size],
          hasError
            ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
            : 'border-gray-300 focus:border-green-120 focus:ring-green-120',
        )}>
          <span className={`${selected ? '' : hasError ? 'text-red-500' : 'text-gray-400'} block truncate`}>{selected ? selected.name : placeholder}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon icon={chevronDownIcon}
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon icon={errorIcon} className="h-5 w-5 text-red-500" />
          </div>
        )}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item, itemIdx) => (
              <Listbox.Option
                key={item.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-120 text-white' : 'text-gray-900'
                  }`
                }
                value={item.id}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                  >
                    {item.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
};

export default React.forwardRef(SelectBox);
