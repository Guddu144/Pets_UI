import React, { useMemo, useEffect } from 'react';
import { useTable, useSortBy, useRowSelect, usePagination } from 'react-table';

import Pagination from './Pagination';
import TableControls from './TableControls';
import Table from './Table';
import { Checkbox } from '../inputs';
import { usePaginatedFetch } from '../../hooks';

const DataTable = ({ onRowClick, apiRequest, columns, placeholder, isRowDisabled, onSelect, topAlign, columnClass, filter, filterGroups, rowKey = 'id', callAgain, noTableControls, noTablePagination, noLimit, rowId }) => {
  const {
    page,
    totalPages,
    isFetching,
    records,
    pagination,
    onQueryChange,
    onPageChange,
    onLimitChange,
  } =usePaginatedFetch(apiRequest, filter, callAgain, noLimit);
  const data = useMemo(() => records, [records]);
  const table = useTable(
    {
      data,
      columns,
      manualPagination: true,
      manualGlobalFilter: true,
      getRowId: (row, relativeIndex, parent) => {
        if (rowKey && row[rowKey]) {
          return row[rowKey];
        }
        return parent ? [parent.id, relativeIndex].join('.') : relativeIndex;
      },
      pageCount: totalPages,
      initialState: {
        pageSize: pagination.limit,
        pageIndex: pagination.offset * pagination.limit,
      },
      autoResetRowState: false,
      autoResetSelectedRows: false,
      autoResetPage: false,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      if (!onSelect) {
        return;
      }
      hooks.visibleColumns.push(cols => [
        {
          id: 'select',
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return (
              <Checkbox
                className="block mx-auto"
                {...getToggleAllRowsSelectedProps()}
              />
            );
          },
          Cell: ({ row }) => (
            <Checkbox
              className="block mx-auto"
              disabled={isRowDisabled && isRowDisabled(row.original)}
              {...row.getToggleRowSelectedProps()}
            />
          ),
        },
        ...cols,
      ]);
    },
  );

  useEffect(() => {
    if (!onSelect) {
      return;
    }
    const rows = Object.keys(table.state.selectedRowIds);
    onSelect(rows);
  }, [table.selectedFlatRows?.length]);

  const hasMoreData = pagination.to < pagination.totalResults || pagination.offset != 0;

  return (
    <div className="flex flex-col">
      {
        !noTableControls &&<TableControls
          globalFilter={pagination.query}
          onQueryChange={onQueryChange}
          placeholder={placeholder || ('Search something')}
          filterGroups={filterGroups}
          onLimitChange={onLimitChange}
          limit={ noLimit ? noLimit : pagination.limit}
        />
      }
      <div className="-my-2 -mx-4 overflow-x-scroll overflow-y-visible sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <Table
            isLoading={isFetching}
            onRowClick={onRowClick}
            topAlign={topAlign}
            columnClass={columnClass}
            {...table}
            rowId={rowId}
          />
        </div>
      </div>
      {!noTablePagination && hasMoreData && (
        <Pagination
          isFetching={isFetching}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          {...pagination}
        />
      )}
    </div>
  );
};

export default DataTable;
