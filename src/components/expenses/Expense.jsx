import React, { useState, useContext, useEffect, useRef } from 'react'
import { Modal, PageHeader, PageLayout } from '../common'
import { Button } from '../inputs'
import { IconPlus, IconX } from '@tabler/icons';
import ExpenseForm from './ExpenseForm';
// import { FormContext } from '../main';

const Expense = () => {
  // const { isEarningFormOpen, setIsEarningFormOpen } = useContext(FormContext)
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

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
            }} full="true" size="xs" kind="primary" className="mr-2 w-28"><IconPlus size="20px" className="mr-2" />Add Expense
            </Button>
          </div>
        }
      />
      <Modal isOpen={isExpenseFormOpen} onClose={() => { setIsExpenseFormOpen(false) }}>
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold"> Expense</h3>
          </div>
          <button onClick={() => { setIsExpenseFormOpen(false) }}>
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <ExpenseForm isExpenseFormOpen={setIsExpenseFormOpen} />
        </div>
      </Modal>

      <PageLayout>
        {/* <PromoTable isPromoFormOpen={setIsPromoFormOpen} setModelID={setModelID} setType={setType} /> */}
      </PageLayout>
    </>

  )
}

export default Expense
