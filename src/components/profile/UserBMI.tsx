import React from 'react';

import ContentBox from '#/components/common/ContentBox';
import BMIChart from '#/components/profile/BMIChart';

import useBMICaculate from '#/hooks/useBMICalculate';

import { User } from '#/api/type';

import { getBMIPeriod } from '#/util';

interface UserBMIProps {
  weight: User['weight'];
  height: User['height'];
}

const UserBMI = ({ weight, height }: UserBMIProps) => {
  const { caculatedBMI } = useBMICaculate(
    parseFloat(weight || '0'),
    parseFloat(height || '0'),
  );

  return (
    <ContentBox contentTitle="water data" className="rounded-2xl w-full">
      <div className="flex justify-between items-center">
        <p>BMI</p>
        <p>{caculatedBMI}</p>
        <div>{getBMIPeriod(caculatedBMI)}</div>
        <BMIChart value={caculatedBMI} />
      </div>
      <div>
        <span className="text-gray-dark text-sm">
          * BMI 지수가 18.5 이하이면 저체중, 18.5 이상 24.9 미만이면 정상체중,
          25 이상 29.9 미만이면 과체중, 30 이상 34.9 이하이면 경도비만, 35 이상
          39.5 이하이면 중등도 비만, 40 이상이면 고도비만입니다.
        </span>
      </div>
    </ContentBox>
  );
};

export default UserBMI;
