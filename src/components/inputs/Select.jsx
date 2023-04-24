import React, { Fragment, useCallback } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { classNames } from '../../utils';

const selectedValues = (options, value, multiple) => {
  const selected = multiple ? options.filter(opt => value.includes(opt.id)) : options.filter(opt => opt.id === value)[0];

  return selected;
};

const SelectedLabel = ({ multiple = false, selected, placeholder, disabled }) => {
  if (multiple) {
    return (
      <span className={classNames(
        'block truncate text-sm',
        (!selected.length || disabled) && 'text-gray-500',
      )}>
        {selected.length ? selected.map(s => s.label).join(', ') : placeholder}
      </span>
    );
  }

  return (
    <span className={classNames(
      'block truncate text-sm',
      (!selected || disabled) && 'text-gray-500',
    )}>
      {selected ? selected.label : placeholder}
    </span>
  );
};

const Select = ({ className, options, placeholder, hasError, value, multiple = false, ...props }, ref) => {
  const selected = useCallback(selectedValues(options, value, multiple), [options, value]);

  return (
    <Listbox value={value} {...props} multiple={multiple}>
      {({ open, disabled }) => (
        <div className={classNames('relative', className)}>
          <Listbox.Button
            ref={ref}
            className={classNames(
              hasError
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-400 focus:border-red-400'
                : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600',
              'relative cursor-default block w-full border rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-1 ',
            )}
          >
            <SelectedLabel multiple={multiple} disabled={disabled} placeholder={placeholder} selected={selected} />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 lg:max-h-44 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
              {options.map(option => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-blue-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9 text-left',
                    )
                  }
                  value={option.id}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {option.label}
                      </span>

                      {selected
                        ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )
                        : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default React.forwardRef(Select);
