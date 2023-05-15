import React from 'react'
import { PageHeader, PageLayout } from '../common'
import GoalList from './GoalList';

const GoalStatus = () => {

  return (
    <>
      <PageHeader
        title={('Budget Status')}
        crumbs={[
          { label: ('Visible representations of budgets') },
        ]}

      />

      <PageLayout>
        <GoalList />
      </PageLayout>
    </>

  )
}

export default GoalStatus
