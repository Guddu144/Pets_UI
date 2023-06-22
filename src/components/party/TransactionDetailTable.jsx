import React, { useMemo } from 'react'
import { useTable } from 'react-table';
import Table from '../tables/Table';

const TransactionDetailTable = ({ party }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Start Date',
        accessor: 'date',
      },
      {
        Header: 'Payment Date',
        accessor: 'paymentDate',
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
    ],
    [],
  );

  const table = useTable({ columns, data: party });

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <Table
        {...table}
      />
    </div>
  );
}

export default TransactionDetailTable
