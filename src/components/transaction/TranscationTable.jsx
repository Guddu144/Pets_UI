import React, { useMemo } from 'react'
import DataTable from '../tables/DataTable';
import { deleteTranscation, fetchTranscationn } from '../../infra';
import { useFilter } from '../../hooks';
import { PlainButton } from '../inputs';
import { TrashIcon } from '@heroicons/react/solid';
import { formatLongDate } from '../../utils/date';

const TranscationTable = ({ party }) => {

  const [filter, updateFilter] = useFilter({
    Type: '',
  });

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
      Header: ('Type'),
      accessor: 'type',
    },
    {
      Header: ('Party'),
      Cell: ({ row: { original } }) => {
        const partyName = party?.data?.find(c => c.id === original.partyId)
        return (
          <span>{partyName ? partyName.name : ''}</span>
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
              onClick={() => deleteTranscation(original.id).then(window.location.reload())}
            >
              <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
            </PlainButton>
          </div>
        );
      },
    },
  ], []);

  const Types = [
    { id: 'in', label: 'Incoming' },
    { id: 'out', label: 'Outgoing' },
  ];

  const filterGroups = useMemo(() => [
    {
      id: 'transaction_type',
      label: 'Transaction Types',
      filters: Types.map(type => ({
        id: type.id,
        label: type.label,
        active: type.id == filter.Types,
        onClick: checked => updateFilter('Types', checked ? type.id : undefined),
      })),
    },
  ], [Types, filter]);

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <DataTable
        columns={columns}
        apiRequest={fetchTranscationn}
        // placeholder={('Search by invoice number, name, amount...')}
        filterGroups={filterGroups}
        filter={filter}
      />
    </div>
  )
}

export default TranscationTable
