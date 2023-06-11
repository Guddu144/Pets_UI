import React, { useEffect, useState } from 'react';
import Card from './Card';
import { IconCash } from '@tabler/icons';
import { PageHeader } from '../common';
import LineChart from './LineChart';
import { chartDataExpense, chartDataIncome, chartPrediction, getDashboardDetail } from '../../infra/apiClient';
import { useHandleError } from '../../hooks';
import { formatDay } from '../../utils/date';
import ComboChart from './ComboChart';

const Dashboard = () => {
  const handleError = useHandleError();
  const [detail, SetDetail] = useState();
  const [labelIncome, setLabelIncome] = useState([]);
  const [currentIncome, setCurrentIncome] = useState([]);
  const [previousIncome, setPreviousIncome] = useState([]);
  const [labelExpense, setLabelExpense] = useState([]);
  const [currentExpense, setCurrentExpense] = useState([]);
  const [previousExpense, setPreviousExpense] = useState([]);
  const [labelPrediction, setLabelPrediction] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  // console.log(labelPrediction, predictedData, currentData)
  useEffect(() => {
    chartDataExpense()
      .then(data => {
        // console.log(data)
        setLabelExpense(data.data.map(i => formatDay(i.label)))
        setCurrentExpense(data.data.map(i => i.current))
        setPreviousExpense(data.data.map(i => i.previous))

      })
    chartDataIncome()
      .then(data => {
        // console.log(data)
        setLabelIncome(data.data.map(i => formatDay(i.label)))
        setCurrentIncome(data.data.map(i => i.current))
        setPreviousIncome(data.data.map(i => i.previous))

      })
    chartPrediction()
      .then(data => {
        setLabelPrediction(data.data.map(i => (i.label)))
        setPredictedData(data.data.map(i => i.predictedData))
        setCurrentData(data.data.map(i => i.currentData))

      })
    const date = new Date();
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const payload = {
      startDate: firstDate.toISOString().substring(0, 10),
      endDate: lastDay.toISOString().substring(0, 10),
    };

    getDashboardDetail(payload)
      .then(SetDetail)
  }, [])

  const labelsIncome = labelIncome
  const currentDatasetsIncome = currentIncome
  const previousDatasetsIncome = previousIncome

  const labelsExpense = labelExpense
  const currentDatasetsExpense = currentExpense
  const previousDatasetsExpense = previousExpense
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
          <div className="grid gap-14 sm:grid-cols-3 md:grid-cols-5  ">
            <Card
              value={detail?.data?.totalIncome}
              className="bg-green-100"
              title={('Total Earning')}
              icon={<IconCash className="text-green-500 " />}
            />
            <Card
              value={detail?.data?.totalExpense}
              className="bg-red-100"
              title={('Total Expense')}
              icon={<IconCash className="text-red-500" />}
            />
            <Card
              value={detail?.data?.totalCashIn}
              className="bg-green-100"
              title={('Total Borrowing')}
              icon={<IconCash className=" text-green-500 " />}
            />
            <Card
              value={detail?.data?.totalCashOut}
              className="bg-red-100"
              title={('Total Lending')}
              icon={<IconCash className=" text-red-500" />}
            />
            <Card
              value={detail?.data?.totalBalance}
              className="bg-blue-100"
              title={('Total Balance')}
              icon={<IconCash className=" text-blue-500" />}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 px-10 gap-x-6">
          <div className="space-y-3">
            <span className="font-bold text-lg">Earning Tracker</span>
            <div className="border rounded-md border-gray-70 p-6 shadow-sm bg-white">
              <div className="flex items-center pb-2">
                <div className="rounded-full bg-orange-500 w-2 h-2"></div>
                <div className="pl-2 text-gray-80 text-sm">Last Month</div>
                <div className="flex items-center ml-5">
                  <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                  <div className="pl-2 text-gray-80 text-sm">This Month</div>
                </div>
              </div>
              <LineChart
                labels={labelsIncome}
                currentDatasets={currentDatasetsIncome}
                previousDatasets={previousDatasetsIncome} />
            </div>
          </div>
          <div className="space-y-3">
            <span className="font-bold text-lg mb-6 ">Expense Tracker</span>
            <div className="border rounded-md border-gray-70 p-6 shadow-sm bg-white">
              <div className="flex items-center pb-2">
                <div className="rounded-full bg-orange-500 w-2 h-2"></div>
                <div className="pl-2 text-gray-80 text-sm">Last Month</div>
                <div className="flex items-center ml-5">
                  <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                  <div className="pl-2 text-gray-80 text-sm">This Month</div>
                </div>
              </div>
              <LineChart
                labels={labelsExpense}
                currentDatasets={currentDatasetsExpense}
                previousDatasets={previousDatasetsExpense} />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 px-10 gap-x-6">
          <div className="space-y-3">
            <span className="font-bold text-lg">Expenses Forecasted Analysis</span>
            <div className="border rounded-md border-gray-70 p-6 shadow-sm bg-white">
              <div className="flex items-center pb-2">
                <div className="rounded-full bg-orange-500 w-2 h-2"></div>
                <div className="pl-2 text-gray-80 text-sm">Prediction Data</div>
                <div className="flex items-center ml-5">
                  <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                  <div className="pl-2 text-gray-80 text-sm">Current Data</div>
                </div>
              </div>
              <ComboChart
                // labels={labelsIncome}
                labels={labelPrediction}
                currentDatasets={currentData}
                previousDatasets={predictedData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
