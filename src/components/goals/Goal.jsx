import React, { useState } from 'react'
import { Modal, PageHeader, PageLayout } from '../common';
import { Button } from '../inputs';
import { IconPlus, IconX } from '@tabler/icons';

const Goal = () => {
  // const { isEarningFormOpen, setIsEarningFormOpen } = useContext(FormContext)
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  return (
    <>
      <PageHeader
        title={('Set Goal')}
        crumbs={[
          { label: ('Add target goal') },
        ]}
        action={
          <div className="flex mt-2">
            <Button onClick={() => {
              setIsExpenseFormOpen(true)
            }} full="true" size="xs" kind="primary" className="mr-2"><IconPlus size="20px" className="mr-2" />Add Goal
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
          {/* <ExpenseForm isExpenseFormOpen={setIsExpenseFormOpen} /> */}
        </div>
      </Modal>

      <PageLayout>

      </PageLayout>
    </>

  )
}

export default Goal
