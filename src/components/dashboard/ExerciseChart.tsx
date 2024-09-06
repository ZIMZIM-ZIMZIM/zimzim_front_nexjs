import React, { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

// import { useGetUserInfoQuery } from '#/api/services/userApi';
// import { useGetExerciseQuery } from '#/api/services/exerciseApi';

import ROUTE from '#/constants/route';
import FORMAT from '#/constants/format';

import WeightIcon from '#assets/icon/chart/weight.svg';
import CardioIcon from '#assets/icon/chart/cardio.svg';
import { EXERCISE_TYPE } from '#/api/types';
import Link from 'next/link';
// import { useRouter } from 'next/router';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseChart = ({ exerciseData }) => {
  // const navigate = useNavigate();
  // const router = useRouter();

  // const { data: userInfo } = useGetUserInfoQuery();

  // const { data: exerciseData, isLoading: isExerciseLoading } =
  //   useGetExerciseQuery(
  //     {
  //       userId: userInfo?.id ?? '',
  //       startDate: dayjs().subtract(7, 'day').format(FORMAT.DATE),
  //       endDate: dayjs().format(FORMAT.DATE),
  //     },
  //     { skip: !userInfo },
  //   );

  // if (isExerciseLoading) {
  //   return <div>loading~</div>;
  // }

  // const { weight, cardio } = useMemo(() => {
  //   let cardio = 0;
  //   let weight = 0;

  //   exerciseData?.forEach((ele) =>
  //     ele.detail.forEach((detail) => {
  //       if (detail.type === EXERCISE_TYPE.CARDIO) {
  //         cardio += parseFloat(detail.duration);
  //       } else {
  //         weight += parseFloat(detail.duration);
  //       }
  //     }),
  //   );

  //   return {
  //     weight,
  //     cardio,
  //   };
  // }, [exerciseData]);

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

  const images = [weight ? WeightIcon : '', cardio ? CardioIcon : ''].map(
    (src) => {
      const img = new Image();
      img.src = src;
      return img;
    },
  );

  // const images = useMemo(
  //   () =>
  //     [weight ? WeightIcon : '', cardio ? CardioIcon : ''].map((src) => {
  //       const img = new Image();
  //       img.src = src;
  //       return img;
  //     }),
  //   [weight, cardio],
  // );

  const customPlugin = {
    id: 'customPlugin',
    afterDatasetDraw(chart: ChartJS) {
      const { ctx } = chart;
      const width = 30;
      ctx.save();

      (chart.getDatasetMeta(0).data as ArcElement[]).forEach(
        (datapoint: ArcElement, index: number) => {
          const { x, y } = datapoint.tooltipPosition(false);

          const image = images[index];

          ctx.drawImage(image, x - width / 2, y - width / 2, width, width);
        },
      );

      ctx.restore();
    },
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-1/3 bg-white rounded-lg border-1 pt-2 px-2 flex flex-col cursor-pointer h-full">
      <p className="text-sm font-bold pl-2">Weight/Cardio</p>
      <div className="w-full flex justify-center h-full p-2 items-center">
        <Link href={ROUTE.EXERCISE.DEFAULT}>
          <Doughnut data={data} options={options} plugins={[customPlugin]} />
        </Link>
      </div>
    </div>
  );
};

export default ExerciseChart;
