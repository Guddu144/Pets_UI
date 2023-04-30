import React, { useState, useContext, useEffect, useRef } from 'react'
import { Modal, PageHeader, PageLayout } from '../common'
import { Button } from '../inputs'
import { IconPlus, IconX } from '@tabler/icons';
import EarningForm from './EarningForm';
import EarningTable from './EarningTable';
import { fetchCategory } from '../../infra';

const Earning = () => {
  const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);
  const [cat, setCat] = useState()
  useEffect(() => {
    fetchCategory()
      .then(setCat)
  }, []);

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
            }} full="true" size="xs" kind="primary" className="mr-2 "><IconPlus size="20px" className="mr-2" />Add Earning
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
        {cat &&
          <EarningTable cat={cat} />
        }
      </PageLayout>
    </>

  )
}

export default Earning
