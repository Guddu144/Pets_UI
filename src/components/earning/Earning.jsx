import React, { useState, useContext, useEffect, useRef } from 'react'
import { Modal, PageHeader, PageLayout } from '../common'
import { Button } from '../inputs'
import { IconPlus, IconX } from '@tabler/icons';
import EarningForm from './EarningForm';
import EarningTable from './EarningTable';
import { fetchCategory, fetchSingleEarning } from '../../infra';

const Earning = () => {
  const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);
  const [cat, setCat] = useState()
  const [type, setType] = useState();
  const [modelID, setModelID] = useState();
  const [val, setVal] = useState();

  useEffect(() => {
    fetchCategory()
      .then(setCat)
  }, []);

  useEffect(() => {
    (
      async () => {
        if (modelID) {
          const val = await fetchSingleEarning(modelID);
          setVal(val);
          setIsEarningFormOpen(true)
        }
      }
    )()
  }, [modelID])

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
              setVal(null)
              setType('Create')
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
          <button onClick={() => { setIsEarningFormOpen(false); setModelID(null) }}>
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <EarningForm type={type} val={val} modelID={modelID} />
        </div>
      </Modal>

      <PageLayout>
        {cat &&
          <EarningTable setType={setType} setModelID={setModelID} cat={cat} />
        }
      </PageLayout>
    </>

  )
}

export default Earning
