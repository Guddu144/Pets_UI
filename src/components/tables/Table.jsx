import React from 'react';
import { classNames } from '../../utils';
import range from 'lodash/range';
// import { Placeholder } from '@/components/common';

const Table = ({
  isLoading,
  headerGroups: headers,
  footerGroups: footers,
  getTableProps,
  getTableBodyProps,
  rows,
  prepareRow,
  columns,
  onRowClick,
  placeholderRows = 5,
  emptyMessage,
  topAlign,
  columnClass,
  rowId,
}) => {
  return (
    <table {...getTableProps()} className="min-w-full">
      <thead>
        {headers.map(group => (
          <tr key={group.id} {...group.getHeaderGroupProps()} className="border-b border-gray-300">
            {group.headers.map(col => (
              <th key={col.id} {...col.getHeaderProps()} className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-900 sm:pl-6 md:pl-3">
                {col.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
        {isLoading && range(placeholderRows).map(i => (
          <tr key={i}>
            <td colSpan={columns.length} className="p-4 sm:px-2">
              {/* <Placeholder vary /> */}
            </td>
          </tr>
        ))}
        {!isLoading && rows.length === 0 && (
          <tr>
            <td colSpan={columns.length} className="p-5">
              <h1 className="text-center my-6 text-lg text-gray-400 font-medium">{emptyMessage || ('No data found')}</h1>
            </td>
          </tr>
        )}
        {!isLoading && rows.length > 0 && rows.map(row => {
          prepareRow(row);
          return (
            <tr
              key={row.id}
              {...row.getRowProps()}
              onClick={() => onRowClick && onRowClick(row.values)}
              className={classNames(
                rowId && rowId === row.original.tripID && 'bg-gray-100' ,
                onRowClick && 'cursor-pointer',' hover:bg-gray-50',
              )}
            >
              {row.cells.map(cell => (
                <td key={cell.id} {...cell.getCellProps()} className={classNames(topAlign ? 'align-top' : '', columnClass ? `${columnClass} `:'', ' text-ellipsis overflow-hidden whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-700 sm:pl-6 md:pl-3')}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footers.map(group => (
          <tr key={group.id} {...group.getFooterGroupProps()} className="border-t border-gray-300">
            {group.headers.map(col => (
              <th key={col.id} {...col.getFooterProps()} className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6 md:pl-3">{col.render('Footer')}</th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table >
  );
};

export default Table;
