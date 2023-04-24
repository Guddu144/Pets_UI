import React, { useState } from 'react'
import { Modal, PageHeader, PageLayout } from '../common';
import { Button } from '../inputs';
import { IconPlus, IconX } from '@tabler/icons';
import PartyForm from '../party/PartyForm';
import TranscationForm from './TranscationForm';

const Transcation = () => {
  const [isTranscationFormOpen, setIsTranscationFormOpen] = useState(false);

  return (
    <>
      <PageHeader
        title={('Transaction')}
        crumbs={[
          { label: ('Transaction detail') },
        ]}
        action={
          <div className="flex mt-2">
            <Button onClick={() => {
              setIsTranscationFormOpen(true)
            }} full="true" size="xs" kind="primary" className="mr-2"><IconPlus size="20px" className="mr-2" />Add Transaction
            </Button>
          </div>
        }
      />
      <Modal isOpen={isTranscationFormOpen} onClose={() => { setIsTranscationFormOpen(false) }}>
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold">Transcation</h3>
          </div>
          <button onClick={() => { setIsTranscationFormOpen(false) }}>
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <TranscationForm isTranscationFormOpen={setIsTranscationFormOpen} />
        </div>
      </Modal>

      <PageLayout>
        {/* <PromoTable isPromoFormOpen={setIsPromoFormOpen} setModelID={setModelID} setType={setType} /> */}
      </PageLayout>
    </>
  )
}

export default Transcation
