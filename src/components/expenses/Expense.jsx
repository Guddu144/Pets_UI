import React, { useState, useContext, useEffect, useRef } from 'react'
import { Modal, PageHeader, PageLayout } from '../common'
import { Button } from '../inputs'
import { IconPlus, IconX } from '@tabler/icons';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import { fetchCategory, fetchSingleExpense } from '../../infra';
// import { FormContext } from '../main';

const Expense = () => {
  // const { isEarningFormOpen, setIsEarningFormOpen } = useContext(FormContext)
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [cat, setCat] = useState();
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
          const val = await fetchSingleExpense(modelID);
          setVal(val);
          setIsExpenseFormOpen(true)
        }
      }
    )()
  }, [modelID])

  return (
    <>
      <PageHeader
        title={('Expense')}
        crumbs={[
          { label: ('Add expense detail') },
        ]}
        action={
          <div className="flex mt-2">
            <Button onClick={() => {
              setIsExpenseFormOpen(true)
              setVal(null)
              setType('Create')
            }} full="true" size="xs" kind="primary" className="mr-2"><IconPlus size="20px" className="mr-2" />Add Expense
            </Button>
          </div>
        }
      />
      <Modal isOpen={isExpenseFormOpen} onClose={() => { setIsExpenseFormOpen(false) }}>
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold"> Expense</h3>
          </div>
          <button onClick={() => { setIsExpenseFormOpen(false); }}>
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <ExpenseForm isExpenseFormOpen={setIsExpenseFormOpen} type={type} val={val} modelID={modelID} />
        </div>
      </Modal>

      <PageLayout>
        {cat &&
          <ExpenseTable setType={setType} setModelID={setModelID} cat={cat} />
        }
      </PageLayout>
    </>

  )
}

export default Expense
