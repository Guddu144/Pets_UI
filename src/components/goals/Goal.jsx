import React, { useEffect, useState } from 'react'
import { Modal, PageHeader, PageLayout } from '../common';
import { Button } from '../inputs';
import { IconPlus, IconX } from '@tabler/icons';
import GoalForm from './GoalForm';
import GoalTable from './GoalTable';
import { fetchCategory } from '../../infra';

const Goal = () => {
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [cat, setCat] = useState()
  useEffect(() => {
    fetchCategory()
      .then(setCat)
  }, []);

  return (
    <>
      <PageHeader
        title={('Set Budget')}
        crumbs={[
          { label: ('Add budget') },
        ]}
        action={
          <div className="flex mt-2">
            <Button onClick={() => {
              setIsExpenseFormOpen(true)
            }} full="true" size="xs" kind="primary" className="mr-2"><IconPlus size="20px" className="mr-2" />Add Budget
            </Button>
          </div>
        }
      />
      <Modal isOpen={isExpenseFormOpen} onClose={() => { setIsExpenseFormOpen(false) }}>
        <div className="mb-2 flex justify-between">
          <div>
            <h3 className="text-lg font-bold">Budget</h3>
          </div>
          <button onClick={() => { setIsExpenseFormOpen(false) }}>
            <IconX size={15} />
          </button>
        </div>
        <div className="divide-gray-200 mx-auto  ">
          <GoalForm />
        </div>
      </Modal>

      <PageLayout>
        {cat &&
          <GoalTable cat={cat} />
        }
      </PageLayout>
    </>

  )
}

export default Goal
