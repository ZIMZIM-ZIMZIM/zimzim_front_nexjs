import { t } from 'i18next';
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
        <div>{t(`PROFILE.BMI.${getBMIPeriod(caculatedBMI)}`)}</div>
        <BMIChart value={caculatedBMI} />
      </div>
      <div>
        <span className="text-gray-dark text-sm whitespace-pre">
          {t('PROFILE.BMI.DESCRIPTION')}
        </span>
      </div>
    </ContentBox>
  );
};

export default UserBMI;
