'use client';

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
import ROUTE from '#/constants/route';
import Link from 'next/link';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WaterChart = () => {
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
    barThickness: 44,
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
    layout: {
      padding: {
        top: 0,
        bottom: 60,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border-1 h-32 pt-2 px-4 w-full cursor-pointer">
      <p className="text-sm font-bold">Water Total Volume</p>
      <Link href={ROUTE.WATER}>
        <Bar data={data} options={options} />
      </Link>
    </div>
  );
};

export default WaterChart;
