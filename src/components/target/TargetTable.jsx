import React, { useMemo } from 'react';
import DataTable from '../tables/DataTable';
import { getTarget } from '../../infra';
import { PlainButton } from '../inputs';
import { EyeIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import toastify from '../../utils/toast';

const TargetTable = ({ cat, setType, setModelID, setId }) => {
  toastify();
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Target Amount',
        accessor: 'targetAmount',
      },
      {
        Header: 'Saved Already',
        accessor: 'savedAlready',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },

      // {
      //   Header: 'Actions',
      //   id: 'actions',
      //   Cell: ({ row: { original } }) => {
      //     return (
      //       <div className="space-x-3">

      //         <PlainButton onClick={() => {
      //           setId(original.id)
      //         }}>
      //           <EyeIcon className="w-5 h-5" />
      //         </PlainButton>
      //         <PlainButton onClick={() => {
      //           setType('Update')
      //           setModelID(original.id)
      //         }}>
      //           <PencilAltIcon className="w-5 h-5" />
      //         </PlainButton>
      //         <PlainButton
      //           onClick={() => {
      //             if (window.confirm('Are you sure?')) {
      //               deleteParty(original.id).then(data => {
      //                 localStorage.setItem('toastMessage', data.message);
      //                 window.location.reload();
      //               });
      //             }
      //           }}
      //         >
      //           <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
      //         </PlainButton>
      //       </div>
      //     );
      //   },
      // },
    ],
    [],
  );

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <DataTable
        columns={columns}
        apiRequest={getTarget}
      // placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  );
};

export default TargetTable;
