import React, { useMemo } from 'react'
import DataTable from '../tables/DataTable';
import { fetchTranscationn } from '../../infra';
import { useFilter } from '../../hooks';
import { formatNepaliDate } from '../../utils/nepaliDate';

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
      accessor: ({ date }) => formatNepaliDate(date),
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
    // {
    //   id: 'more-actions',
    //   Cell: () => (
    //     <div>
    //       <PlainButton className="hover:bg-blue-50 p-1 rounded-full hidden sm:inline-block">
    //         <IconDotsVertical className="w-6 h-6" />
    //       </PlainButton>
    //     </div>
    //   ),
    // },
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
