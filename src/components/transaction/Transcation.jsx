import React, { useEffect, useState } from 'react';
import { Modal, PageHeader, PageLayout } from '../common';
import { Button } from '../inputs';
import { IconPlus, IconX } from '@tabler/icons';
import TranscationForm from './TranscationForm';
import TranscationTable from './TranscationTable';
import { fetchSingleTransaction, partyTable } from '../../infra';

const Transcation = () => {
  const [isTranscationFormOpen, setIsTranscationFormOpen] = useState(false);
  const [party, setParty] = useState();
  const [type, setType] = useState();
  const [modelID, setModelID] = useState();
  const [val, setVal] = useState();
  useEffect(() => {
    (async () => {
      if (modelID) {
        const val = await fetchSingleTransaction(modelID);
        setVal(val);
        setIsTranscationFormOpen(true);
      }
    })();
  }, [modelID]);

  useEffect(() => {
    partyTable().then(setParty);
  }, []);

  return (
    <>
      <PageHeader
        title={'Transaction'}
        crumbs={[{ label: 'Transaction detail' }]}
        action={
          <div className="flex mt-2">
            <Button
              onClick={() => {
                setIsTranscationFormOpen(true);
                setType('Create');
                setVal(null);
              }}
              full="true"
              size="xs"
              kind="primary"
              className="mr-2"
            >
              <IconPlus size="20px" className="mr-2" />
              Add Transaction
            </Button>
          </div>
        }
      />
      <Modal
        isOpen={isTranscationFormOpen}
        onClose={() => {
          setIsTranscationFormOpen(false);
        }}
      >
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold">Transcation</h3>
          </div>
          <button
            onClick={() => {
              setIsTranscationFormOpen(false);
            }}
          >
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <TranscationForm
            isTranscationFormOpen={setIsTranscationFormOpen}
            type={type}
            val={val}
            modelID={modelID}
          />
        </div>
      </Modal>

      <PageLayout>
        {party && (
          <TranscationTable
            party={party}
            setType={setType}
            setModelID={setModelID}
          />
        )}
      </PageLayout>
    </>
  );
};

export default Transcation;
