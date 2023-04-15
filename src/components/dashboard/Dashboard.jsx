import React from 'react';
import Card from './Card';
import { IconCash } from '@tabler/icons';
import { PageHeader } from '../common';

const Dashboard = () => {

  return (
    <>
      <PageHeader
        title={('Dashboard')}
        crumbs={[
          { label: ('Main datasets') },
        ]}

      />

      <div className="mt-10 ">
        <div className="m-8 ">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4  ">
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
            <Card
              value="2400"
              className="bg-green-100"
              title={('Gross Profit')}
              icon={<IconCash className="text-green-500" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
