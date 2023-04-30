import React, { useMemo } from 'react'
import { formatLongDate } from '../../utils/date';
import DataTable from '../tables/DataTable';
import { fetchTranscationn } from '../../infra';

const TranscationTable = ({ party }) => {

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
    // {
    //   Header: ('Party'),
    //   accessor: 'partyId',
    // },
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

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <DataTable
        columns={columns}
        apiRequest={fetchTranscationn}
        placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  )
}

export default TranscationTable
