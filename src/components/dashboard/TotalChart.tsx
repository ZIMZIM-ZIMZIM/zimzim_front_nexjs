import React, { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import dayjs from 'dayjs';

// import { useGetUserInfoQuery } from '#/api/services/userApi';
// import { useGetExerciseQuery } from '#/api/services/exerciseApi';

import FORMAT from '#/constants/format';
import ROUTE from '#/constants/route';
import Link from 'next/link';
// import { useRouter } from 'next/router';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TotalChart = () => {
  // const navigate = useNavigate();
  // const router = useRouter();

  // const { data: userInfo } = useGetUserInfoQuery();

  // const dateRagne = useMemo(
  //   () =>
  //     Array.from({ length: 7 }, (_, i) =>
  //       dayjs().subtract(6, 'day').add(i, 'day').format(FORMAT.DATE),
  //     ),
  //   [],
  // );
  const dateRagne = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6, 'day').add(i, 'day').format(FORMAT.DATE),
  );

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
    <div className="w-2/3 bg-white rounded-lg border-1 border-gray-light py-2 px-4 cursor-pointer h-full">
      <p className="text-sm font-bold pb-2">Total workout volume</p>
      <Link href={ROUTE.EXERCISE.DEFAULT}>
        <Line data={data} options={options} />
      </Link>
    </div>
  );
};

export default TotalChart;
