import React, { useEffect, useState } from 'react'
import { PageHeader, PageLayout } from '../common'
import { getNotification } from '../../infra/apiClient'
import { formatDateTime } from '../../utils/date'

const Notification = () => {
  const [noti, setNoti] = useState()
  useEffect(() => {
    getNotification().then(setNoti)
  }, [])
  return (
    <>
      <PageHeader
        title={'Notification'}
        crumbs={[{ label: 'Transaction detail' }]}

      />

      <PageLayout>
        <ol className="relative border-l border-gray-200 dark:border-gray-700 m-10">
          {noti?.data.map(i => {
            return (
              <li key={i.id} className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none  text-gray-900 dark:text-white">{formatDateTime(i.createdAt)}</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{i.type}</h3>
              </li>
            )
          },
          )}
        </ol>
      </PageLayout>
    </>
  )
}

export default Notification
