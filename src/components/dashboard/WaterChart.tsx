'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import ROUTE from '#/constants/route';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WaterChart = () => {
  const { t, i18n } = useTranslation();

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
    barThickness: 40,
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
    <section
      className="h-36 bg-white rounded-lg border-1 pt-2 px-4 w-full cursor-pointer shadow-md shadow-gray-dark/25"
      aria-labelledby="water-chart-title"
    >
      <p className="text-sm font-bold">{t('DASHBOARD.CHART.WATER.TITLE')}</p>
      <Link href={`/${i18n.language}${ROUTE.WATER.LIST}`}>
        <Bar data={data} options={options} height={100} />
      </Link>
    </section>
  );
};

export default WaterChart;
