import React, { useMemo } from 'react'
import { formatLongDate } from '../../utils/date';
import DataTable from '../tables/DataTable';
import { fetchEarning } from '../../infra';

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
        apiRequest={fetchEarning}
        placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  )
}

export default EarningTable
