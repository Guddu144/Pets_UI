import React, { useEffect, useState } from 'react';
import { Modal, PageHeader, PageLayout } from '../common';
import { Button } from '../inputs';
import { IconPlus, IconX } from '@tabler/icons';
import TargetForm from './TargetFOrm';
import TargetTable from './TargetTable';

const Target = () => {
  const [isTargetFormOpen, setIsTargetFormOpen] = useState(false);
  const [party, setParty] = useState();
  const [type, setType] = useState();
  const [modelID, setModelID] = useState();
  const [val, setVal] = useState();

  return (
    <>
      <PageHeader
        title={'Target'}
        crumbs={[{ label: 'Target detail' }]}
        action={
          <div className="flex mt-2">
            <Button
              onClick={() => {
                setIsTargetFormOpen(true);
                setType('Create');
                setVal(null);
              }}
              full="true"
              size="xs"
              kind="primary"
              className="mr-2"
            >
              <IconPlus size="20px" className="mr-2" />
              Add Target Mission
            </Button>
          </div>
        }
      />
      <Modal
        isOpen={isTargetFormOpen}
        onClose={() => {
          setIsTargetFormOpen(false);
        }}
      >
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold">Target</h3>
          </div>
          <button
            onClick={() => {
              setIsTargetFormOpen(false);
            }}
          >
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <TargetForm type={type} />
        </div>
      </Modal>

      <PageLayout>
        <TargetTable />
      </PageLayout>
    </>
  );
};

export default Target;
