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
  const { t, i18n } = useTranslation('common');

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
    <section className="bg-white rounded-lg border-1 h-32 pt-2 px-4 w-full cursor-pointer shadow-md shadow-gray-dark/25">
      <p className="text-sm font-bold">{t('DASHBOARD.CHART.WATER.TITLE')}</p>
      <Link href={`/${i18n.language}${ROUTE.WATER}`}>
        <Bar data={data} options={options} />
      </Link>
    </section>
  );
};

export default WaterChart;
