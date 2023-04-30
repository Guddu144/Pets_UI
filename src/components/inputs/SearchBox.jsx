import React, { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { classNames } from '../../utils';
import { useDebounced } from '../../hooks';

const SearchBox = ({ options, value, onChange, onAddOption, onQuery, placeholder, hasError, emptyText, disabled = false }, ref) => {
  const { t } = useTranslation();
  // const [query, setQuery] = useState();
  const [forceOpen, setForceOpen] = useState(false);
  // const nuId = useMemo(shortid, []);

  const debouncedSearch = useDebounced(val => {
    // setQuery(val);
    onQuery(val);
  });

  const handleChange = id => {
    onChange(id);
  };

  const [selected] = options.filter(opt => opt.id === value);

  const opts = [...options];

  return (
    <Combobox value={value} onChange={handleChange} disabled={disabled}>
      {({ open }) => (
        <div className="relative mt-1">
          <div className=" cursor-default rounded-md bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">

            <Combobox.Button
              onClick={() => setForceOpen(false)}
              className={classNames(

                'relative w-full inset-y-0 right-0 flex items-center',
              )}
            >

              {({ open }) => (
                <>
                  <Combobox.Input
                    ref={ref}
                    onFocus={() => setForceOpen(true)}
                    onBlur={() => setForceOpen(false)}
                    className={classNames(
                      'appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none text-sm disabled:bg-gray-50',
                      hasError
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-400 focus:border-red-400'
                        : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600 placeholder-gray-400',
                    )}
                    displayValue={() => selected?.name}
                    placeholder={placeholder}
                    onChange={e => debouncedSearch(e.target.value)}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  {(open || forceOpen)
                    ? <ChevronUpIcon className="absolute right-5 h-5 w-5 text-gray-900" />
                    : <ChevronDownIcon className="absolute right-5 h-5 w-5 text-gray-900" />}
                </>
              )
              }
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            show={open || forceOpen}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options static className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {opts.length === 0 && (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {emptyText || t('No data found.')}
                </div>
              )}
              {opts.map(item => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pr-10 pl-4',
                      active ? 'bg-blue-300 text-white' : 'text-gray-900',
                    )
                  }
                  value={item.id}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={classNames('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {item.name || item.value}
                      </span>
                      {selected ? (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-3',
                            active ? 'text-white' : 'text-blue-300',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox >
  );
};

export default React.forwardRef(SearchBox);
