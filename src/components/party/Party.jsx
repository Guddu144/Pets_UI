import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal, PageHeader, PageLayout } from '../common';
import { Button } from '../inputs';
import { IconPlus, IconX } from '@tabler/icons';
import PartyForm from './PartyForm';
import PartyTable from './PartyTable';
import { fetchPartyDetail, fetchSingleParty } from '../../infra';
import TransactionDetailTable from './TransactionDetailTable';

const Party = () => {
  const [isPartyFormopen, setIsPartyFormopen] = useState(false);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [party, setParty] = useState();
  const [modelID, setModelID] = useState();
  const [val, setVal] = useState();
  useEffect(() => {
    (async () => {
      if (modelID) {
        const val = await fetchSingleParty(modelID);
        setVal(val);
        setIsPartyFormopen(true);
      }
    })();

  }, [modelID]);

  useEffect(() => {
    (async () => {
      if (id) {
        const val = await fetchPartyDetail(id);
        setParty(val)
        setOpen(true);
      }
    })();

  }, [id]);

  return (
    <>
      <PageHeader
        title={'Party'}
        crumbs={[{ label: 'Party detail' }]}
        action={
          <div className="flex mt-2">
            <Button
              onClick={() => {
                setIsPartyFormopen(true);
                setType('Create');
                setVal(null);
              }}
              full="true"
              size="xs"
              kind="primary"
              className="mr-2"
            >
              <IconPlus size="20px" className="mr-2" />
              Add Party
            </Button>
          </div>
        }
      />
      <Modal
        isOpen={isPartyFormopen}
        onClose={() => {
          setIsPartyFormopen(false);
          setModelID(null)

        }}
      >
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold"> Party</h3>
          </div>
          <button
            onClick={() => {
              setIsPartyFormopen(false);
            }}
          >
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <PartyForm
            isPartyFormopen={setIsPartyFormopen}
            type={type}
            val={val}
            modelID={modelID}
          />
        </div>
      </Modal>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setId(null)
        }}
      >
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold"> Transaction Details</h3>
          </div>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <TransactionDetailTable party={party?.data} />
        </div>
      </Modal>

      <PageLayout>
        <PartyTable setType={setType} setModelID={setModelID} setId={setId} />
      </PageLayout>
    </>
  );
};

export default Party;
