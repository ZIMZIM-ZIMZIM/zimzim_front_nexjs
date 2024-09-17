import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

interface BMIChartProps {
  value: number;
}

const BMIChart = ({ value }: BMIChartProps) => {
  const data = {
    datasets: [
      {
        data: [6.4, 6.4, 6.4, 6.4, 6.4, 6.4],
        backgroundColor: [
          'rgb(135, 206, 250)',
          'rgb(76, 175, 80)',
          'rgb(255, 235, 59)',
          'rgb(255, 165, 0)',
          'rgb(255, 69, 0)',
          'rgb(255, 0, 0)',
        ],
        borderWidth: 1,
        cutout: '80%',
        circumference: 180,
        rotation: 270,
        needleValue: value - 12,
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
    <div className="w-40 h-40">
      <Doughnut data={data} options={options} plugins={[customPlugin]} />
    </div>
  );
};

export default BMIChart;
