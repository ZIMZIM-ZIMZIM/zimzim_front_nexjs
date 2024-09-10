'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Exercise } from '#/api/types';

import FORMAT from '#/constants/format';
import ROUTE from '#/constants/route';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TotalChart = ({ exerciseData }: { exerciseData: Exercise[] }) => {
  const { t, i18n } = useTranslation();

  const dateRagne = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        dayjs().subtract(6, 'day').add(i, 'day').format(FORMAT.DATE),
      ),
    [],
  );

  const data = {
    labels: dateRagne,
    datasets: [
      {
        data: dateRagne.map((date) => {
          const filter = exerciseData?.filter(
            (exercise) => dayjs(exercise.date).format(FORMAT.DATE) === date,
          );

          if (filter && filter?.length > 0) {
            return filter[0].totalDuration;
          } else {
            return '0';
          }
        }),
        fill: false,
        borderColor: '#98abf9',
        pointStyle: 'line',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
        min: 0,
        max: 120,
      },
    },
  };

  return (
    <section
      className="w-2/3 bg-white rounded-lg border-1 border-gray-light py-2 px-4 cursor-pointer shadow-md shadow-gray-dark/25"
      aria-labelledby="total-chart-title"
    >
      <p className="text-sm font-bold pb-2">
        {t('DASHBOARD.CHART.TOTAL.TITLE')}
      </p>
      <Link href={`/${i18n.language}${ROUTE.EXERCISE.DEFAULT}`}>
        <Line data={data} options={options} />
      </Link>
    </section>
  );
};

export default TotalChart;
