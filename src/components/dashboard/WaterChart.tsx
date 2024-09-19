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
import { twMerge } from 'tailwind-merge';

import FallbackView from '#/components/common/FallbackView';

import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export interface WaterData {
  totalWaterAmount: number;
}

interface WaterChartProps {
  waterData: WaterData;
}

const WaterChart = ({ waterData }: WaterChartProps) => {
  const { t, i18n } = useTranslation();

  const data = {
    labels: ['water'],
    datasets: [
      {
        label: '',
        data: [waterData.totalWaterAmount],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#19abab',
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
      className={twMerge(
        'h-36 bg-white rounded-lg border-1 py-2 px-4 w-full shadow-md shadow-gray-dark/25 relative',
        `${waterData.totalWaterAmount > 0 && 'cursor-pointer'}`,
      )}
      aria-labelledby="water-chart-title"
    >
      <p className="text-sm font-bold">{t('DASHBOARD.CHART.WATER.TITLE')}</p>
      {waterData.totalWaterAmount === 0 && (
        <FallbackView>
          <Link
            href={`/${i18n.language}${ROUTE.WATER.LIST}`}
            className={twMerge(
              PRIMARY_BUTTON,
              'w-52 flex justify-center items-center hover:bg-primary/75 animate-bounce',
            )}
          >
            {t('DASHBOARD.REGISTER_BUTTON')}
          </Link>
        </FallbackView>
      )}
      {waterData.totalWaterAmount > 0 && (
        <>
          <Link href={`/${i18n.language}${ROUTE.WATER.LIST}`}>
            <Bar data={data} options={options} height={100} />
          </Link>
        </>
      )}
    </section>
  );
};

export default WaterChart;
