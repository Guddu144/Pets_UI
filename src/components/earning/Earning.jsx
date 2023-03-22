import React, { useState, useContext, useEffect, useRef } from 'react'
import { Modal, PageHeader, PageLayout } from '../common'
import { Button } from '../inputs'
import { IconPlus, IconX } from '@tabler/icons';
import EarningForm from './EarningForm';
// import { FormContext } from '../main';

const Earning = () => {
  // const { isEarningFormOpen, setIsEarningFormOpen } = useContext(FormContext)
  const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);

  return (
    <>
      <PageHeader
        title={('Earning')}
        crumbs={[
          { label: ('Add earning detail') },
        ]}
        action={
          <div className="flex mt-2">
            <Button onClick={() => {
              setIsEarningFormOpen(true)
            }} full="true" size="xs" kind="primary" className="mr-2 w-28"><IconPlus size="20px" className="mr-2" />Add Earning
            </Button>
          </div>
        }
      />
      <Modal isOpen={isEarningFormOpen} onClose={() => { setIsEarningFormOpen(false) }}>
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold"> Earnings</h3>
          </div>
          <button onClick={() => { setIsEarningFormOpen(false) }}>
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <EarningForm isEarningFormOpen={setIsEarningFormOpen} />
        </div>
      </Modal>

      <PageLayout>
        {/* <PromoTable isPromoFormOpen={setIsPromoFormOpen} setModelID={setModelID} setType={setType} /> */}
      </PageLayout>
    </>

  )
}

export default Earning
