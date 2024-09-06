import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import { useNavigate } from 'react-router-dom';
import ROUTE from '#/constants/route';
import { useRouter } from 'next/router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WaterChart = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  const data = {
    labels: ['January'],
    datasets: [
      {
        label: 'Sales 2024 (M)',
        data: [100],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        display: false,
        max: 100,
      },
    },
  };

  return (
    <div
      className="bg-white rounded-lg border-1 h-32 pb-6 pt-2 px-4 w-full cursor-pointer"
      onClick={() => router.push(ROUTE.WATER)}
    >
      <p className="text-sm font-bold">Water Total Volume</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WaterChart;
