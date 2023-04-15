import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons';
import { useDebounced } from '../../hooks';

import Filter from './Filter';
import FilterPreview from './FilterPreview';
import { Select } from '../inputs';

const TableControls = ({ globalFilter, placeholder, onQueryChange, filterGroups, limit, onLimitChange }) => {
  const [filter, setFilter] = useState(globalFilter || '');

  const filterResult = useDebounced(val => {
    onQueryChange(val);
  }, 500);

  const limitOptions = [
    {
      id: 10,
      label: 10,
    },
    {
      id: 20,
      label: 20,
    },
    {
      id: 30,
      label: 30,
    },
    {
      id: 50,
      label: 50,
    },
  ];

  return (
    <div className="mb-3">
      {filterGroups && (
        <FilterPreview filters={filterGroups} />
      )}
      <div className="flex justify-between rounded p-3 bg-gray-50">
        <div className="relative flex-1 border rounded-md p-2 bg-white">
          <div className="absolute inset-y-0 flex items-center pointer-events-none">
            <IconSearch className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="appearance-none h-full block w-full pl-7 sm:text-sm focus-within:outline-none bg-transparent"
            placeholder={placeholder || ('Search Something')}
            value={filter}
            onChange={e => {
              setFilter(e.target.value);
              filterResult(e.target.value);
            }}
          />
        </div>
        {filterGroups && (
          <Filter filters={filterGroups} className="border rounded" />
        )}
        <Select
          options={limitOptions}
          value={limit}
          onChange={onLimitChange}
          className="w-20 bg-white"
        />
      </div>
    </div>
  );
};

export default TableControls;
