'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Exercise, EXERCISE_TYPE } from '#/api/type';

import ROUTE from '#/constants/route';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseChart = ({ exerciseData }: { exerciseData: Exercise[] }) => {
  const { t, i18n } = useTranslation();

  const { weight, cardio } = useMemo(() => {
    let cardio = 0;
    let weight = 0;

    exerciseData?.forEach((ele) =>
      ele.detail.forEach((detail) => {
        if (detail.type === EXERCISE_TYPE.CARDIO) {
          cardio += parseFloat(detail.duration);
        } else {
          weight += parseFloat(detail.duration);
        }
      }),
    );

    return {
      weight,
      cardio,
    };
  }, [exerciseData]);

  const data = {
    labels: [EXERCISE_TYPE.WEIGHT, EXERCISE_TYPE.CARDIO],
    datasets: [
      {
        data: [weight, cardio],
        fill: false,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  const images = [
    weight ? '/icon/chart/weight.svg' : '',
    cardio ? '/icon/chart/cardio.svg' : '',
  ].map((src) => {
    if (src !== '') {
      const img = new Image();
      img.src = src;
      img.width = 40;
      img.height = 40;

      return img;
    }
  });

  const customPlugin = {
    id: 'customPlugin',
    afterDatasetDraw(chart: ChartJS<'doughnut'>) {
      const { ctx } = chart;
      const width = 30;
      ctx.save();

      (chart.getDatasetMeta(0).data as ArcElement[]).forEach(
        (datapoint: ArcElement, index: number) => {
          const { x, y } = datapoint.tooltipPosition(false);

          const image = images[index];

          if (image) {
            ctx.drawImage(image, x - width / 2, y - width / 2, width, width);
          }
        },
      );

      ctx.restore();
    },
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section
      className="w-1/3 bg-white rounded-lg border-1 pt-2 px-2 flex flex-col cursor-pointer shadow-md shadow-gray-dark/25 h-full"
      aria-labelledby="exercise-chart-title"
    >
      <p className="text-sm font-bold pl-2">
        {t('DASHBOARD.CHART.WIEGHT_CARDIO.TITLE')}
      </p>
      <div className="w-full flex justify-center h-full p-2 items-center">
        <Link href={`/${i18n.language}${ROUTE.EXERCISE.DEFAULT}`}>
          <Doughnut data={data} options={options} plugins={[customPlugin]} />
        </Link>
      </div>
    </section>
  );
};

export default ExerciseChart;
