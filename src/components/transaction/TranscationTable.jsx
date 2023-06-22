import React, { useMemo } from 'react';
import DataTable from '../tables/DataTable';
import { deleteTranscation, fetchTranscationn } from '../../infra';
import { useFilter } from '../../hooks';
import { PlainButton } from '../inputs';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { formatLongDate } from '../../utils/date';
import toastify from '../../utils/toast';

const TranscationTable = ({ party, cat, setType, setModelID }) => {
  toastify();

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
        Header: 'Date',
        accessor: ({ date }) => formatLongDate(date),
      },
      {
        Header: 'paymentDate',
        accessor: ({ paymentDate }) => formatLongDate(paymentDate),
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Party',
        Cell: ({ row: { original } }) => {
          const partyName = party?.data?.find(c => c.id === original.partyId);
          return <span>{partyName ? partyName.name : ''}</span>;
        },
      },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row: { original } }) => {
          return (
            <div className="space-x-3">
              <PlainButton onClick={() => {
                setType('Update')
                setModelID(original.id)
              }}>
                <PencilAltIcon className="w-5 h-5" />
              </PlainButton>
              <PlainButton
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    deleteTranscation(original.id).then(data => {
                      localStorage.setItem('toastMessage', data.message);
                      window.location.reload();
                    });
                  }
                }}
              >
                <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
              </PlainButton>
            </div>
          );
        },
      },
    ],
    [],
  );

  const Types = [
    { id: 'in', label: 'Incoming' },
    { id: 'out', label: 'Outgoing' },
  ];

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <DataTable
        columns={columns}
        apiRequest={fetchTranscationn}
      />
    </div>
  );
};

export default TranscationTable;
