import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const BMIChart = ({ value }) => {
  const data = {
    datasets: [
      {
        data: [18.5, 6.4, 6.4, 6.4, 6.4, 6.4],
        backgroundColor: [
          'rgb(76, 175, 80)',
          'rgb(173, 204, 48)',
          'rgb(219, 167, 55)',
          'rgb(255, 166, 0)',
          'rgb(255, 102, 0)',
          'rgb(255, 0, 0)',
        ],
        borderWidth: 0,
        cutout: '80%',
        circumference: 180,
        rotation: 270,
        needleValue: value,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  const customPlugin = {
    id: 'gaugeNeedle',
    afterDatasetsDraw(chart) {
      const { ctx, data } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const widthSlice = (outerRadius - innerRadius) / 4;
      const radius = 6;

      const needleValue = data.datasets[0].needleValue;
      const totalDataValue = data.datasets[0].data.reduce((a, b) => a + b, 0);

      const angle = Math.PI * (needleValue / totalDataValue);

      ctx.save();
      ctx.translate(xCenter, yCenter);
      ctx.rotate(angle - Math.PI / 2);

      ctx.beginPath();
      ctx.moveTo(0, -innerRadius - widthSlice);
      ctx.lineTo(-5, 0);
      ctx.lineTo(5, 0);
      ctx.fillStyle = '#7287dc';
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#7287dc';
      ctx.fill();
      ctx.restore();
    },
  };

  return (
    <div className="w-32 h-32">
      <Doughnut data={data} options={options} plugins={[customPlugin]} />
    </div>
  );
};

export default BMIChart;
