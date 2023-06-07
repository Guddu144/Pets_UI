import React, { useMemo } from 'react'
import DataTable from '../tables/DataTable';
import { deleteEarning, fetchEarning } from '../../infra';
import { PlainButton } from '../inputs';
import { TrashIcon } from '@heroicons/react/solid';
import { formatLongDate } from '../../utils/date';

const EarningTable = ({ cat }) => {

  const columns = useMemo(() => [
    {
      Header: ('Id'),
      accessor: 'id',
    },
    {
      Header: ('Amount'),
      accessor: 'amount',
    },
    {
      Header: ('Date'),
      accessor: ({ date }) => formatLongDate(date),
    },
    {
      Header: ('Payment Method'),
      accessor: 'paymentMethod',
    },
    {
      Header: ('Category'),
      Cell: ({ row: { original } }) => {
        const category = cat?.data?.find(c => c.id === original.categoryId)
        return (
          <span>{category ? category.title : ''}</span>
        )
      },
    },

    {
      Header: 'Actions',
      id: 'actions',
      Cell: ({ row: { original } }) => {

        return (
          <div className="space-x-3">
            {/* 
            <PlainButton onClick={() => onEdit(original)}>
              <PencilAltIcon className="w-5 h-5" />
            </PlainButton> */}
            <PlainButton
              onClick={() => deleteEarning(original.id).then(window.location.reload())}
            >
              <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
            </PlainButton>
          </div>
        );
      },
    },
  ], []);

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <DataTable
        columns={columns}
        apiRequest={fetchEarning}
      // placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  )
}

export default EarningTable
