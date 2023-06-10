import React, { useMemo } from "react";
import DataTable from "../tables/DataTable";
import { deleteParty, partyTable } from "../../infra";
import { PlainButton } from "../inputs";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import toastify from "../../utils/toast";

const PartyTable = () => {
  toastify();
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact Number",
        accessor: "contactNo",
      },

      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row: { original } }) => {
          return (
            <div className="space-x-3">
              <PlainButton onClick={() => console.log(original.id)}>
                <PencilAltIcon className="w-5 h-5" />
              </PlainButton>
              <PlainButton
                onClick={() =>
                  deleteParty(original.id).then(window.location.reload())
                }
              >
                <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
              </PlainButton>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="max-w-full mx-auto px-4 py-4 sm:px-6 md:px-8 bg-white">
      <DataTable
        columns={columns}
        apiRequest={partyTable}
        // placeholder={('Search by invoice number, name, amount...')}
      />
    </div>
  );
};

export default PartyTable;
