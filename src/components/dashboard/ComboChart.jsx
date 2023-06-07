import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,

  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const labels = ['Jan', 'fb', 'mar'];

const ComboChart = ({ labels, currentDatasets, previousDatasets }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Current Data',
        data: currentDatasets,
        borderColor: '#003D87',
        backgroundColor: '#003D87',
        // tension: 0.1,
        order: 1,
      },
      {
        label: 'Predicted Data',
        data: previousDatasets,
        borderColor: '#FF5527',
        backgroundColor: '#FF5527',
        // tension: 0.1,
        type: 'line',
        order: 0,
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

  return <Bar options={options} data={data} />;
}

export default ComboChart;
