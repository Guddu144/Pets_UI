import React, { useMemo } from 'react'
import DataTable from '../tables/DataTable';
import { deleteGoal, fetchGoal } from '../../infra';
import { PlainButton } from '../inputs';
import { TrashIcon } from '@heroicons/react/solid';

const GoalTable = ({ cat }) => {

  const columns = useMemo(() => [
    {
      Header: ('Id'),
      accessor: 'id',
    },
    {
      Header: ('Budget Name'),
      accessor: 'name',
    },
    {
      Header: ('Targt Budget Amount'),
      accessor: 'targetAmount',
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
              onClick={() => deleteGoal(original.id).then(window.location.reload())}
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
        apiRequest={fetchGoal}
        placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  )
}

export default GoalTable
