import React from 'react'
import { PageHeader, PageLayout } from '../common'
import GoalList from './GoalList';

const GoalStatus = () => {

  return (
    <>
      <PageHeader
        title={('Goal Status')}
        crumbs={[
          { label: ('Visible representations of Goals') },
        ]}

      />

      <PageLayout>
        <GoalList />
      </PageLayout>
    </>

  )
}

export default GoalStatus
