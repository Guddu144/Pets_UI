import { IconDotsVertical } from '@tabler/icons';
import React, { useMemo } from 'react'
import DataTable from '../tables/DataTable';
import { partyTable } from '../../infra';

const PartyTable = () => {

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
      Header: ('Email'),
      accessor: 'email',
    },
    {
      Header: ('Contact Number'),
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
        apiRequest={partyTable}
      // placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  )
}

export default PartyTable
