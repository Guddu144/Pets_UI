import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ labels, currentDatasets, previousDatasets }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'This Month',
        data: currentDatasets,
        borderColor: '#003D87',
        backgroundColor: '#003D87',
        tension: 0.1,
      },
      {
        label: 'Last Month',
        data: previousDatasets,
        borderColor: '#FF5527',
        backgroundColor: '#FF5527',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,

        },
      },
      y: {
        ticks: {
          padding: 15,
        },
        border: {
          display: false,
          dash: [1, 4],
        },
        grid: {
          color: '#84818A',
          drawTicks: false,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
