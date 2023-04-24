import React, { useMemo } from 'react'
import DataTable from '../tables/DataTable';

const ExpenseTable = () => {

  const columns = useMemo(() => [
    {
      Header: ('Id'),
      accessor: 'id',
    },
    {
      Header: ('Name'),
      accessor: 'name',
    },
    {
      Header: ('email'),
      accessor: 'email',
    },
    {
      Header: ('contactNo'),
      accessor: 'contactNo',
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
        // apiRequest={partyTable}
        placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  )
}

export default ExpenseTable
