import React, { useEffect, useState } from 'react';
import Card from './Card';
import { IconCash } from '@tabler/icons';
import { PageHeader } from '../common';
import LineChart from './LineChart';
import { chartData } from '../../infra/apiClient';
import { useHandleError } from '../../hooks';
import { formatDay, formatShortDate } from '../../utils/date';

const Dashboard = () => {
  const handleError = useHandleError();
  const [label, setLabel] = useState([]);
  const [current, setCurrent] = useState([]);
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    chartData()
      .then(data => {
        // console.log(data)
        setLabel(data.data.map(i => i.label))
        setCurrent(data.data.map(i => i.current))
        setPrevious(data.data.map(i => i.previous))

      })
  }, [])

  const labels = label
  const currentDatasets = current
  const previousDatasets = previous

  return (
    <>
      <PageHeader
        title={('Dashboard')}
        crumbs={[
          { label: ('Main datasets') },
        ]}

      />

      <div className="pt-10 bg-gray-50">
        <div className="m-4 mx-8">
          <div className="grid gap-14 sm:grid-cols-1 md:grid-cols-3  ">
            <Card
              value="2400"
              className="bg-red-50"
              title={('Total Earning')}
              icon={<IconCash className="text-red-300 " />}
            />
            <Card
              className="bg-orange-50"
              title={('Total Expense')}
              icon={<IconCash className="text-orange-300" />}
            />
            <Card
              className="bg-blue-100"
              title={('Total Balance')}
              icon={<IconCash className=" text-blue-500" />}
            />
          </div>
        </div>
        <span className="font-bold text-lg pb-2 pl-12">Expense Tracker</span>

        <div className="mt-5 grid grid-cols-2 pl-12">
          <div className="border rounded-md border-gray-70 p-6 bg-white">
            <div className="flex items-center pb-2">
              <div className="rounded-full bg-orange-500 w-2 h-2"></div>
              <div className="pl-2 text-gray-80 text-sm">Last Month</div>
              <div className="flex items-center ml-5">
                <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                <div className="pl-2 text-gray-80 text-sm">This Month</div>
              </div>
            </div>
            <LineChart
              labels={labels}
              currentDatasets={currentDatasets}
              previousDatasets={previousDatasets} />
          </div>
        </div>

      </div>
    </>
  );
};
export default Dashboard;
