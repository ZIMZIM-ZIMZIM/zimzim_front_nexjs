import dayjs from 'dayjs';

import FORMAT from '#/constants/format';

export const getKoreaDate = () => {
  const date = new Date();

  date.setHours(date.getHours() + 9);

  return date.toISOString().split('T')[0];
};

export const getSevenDays = () => {
  const startDate = dayjs().subtract(7, 'day').format(FORMAT.DATE);
  const endDate = dayjs().format(FORMAT.DATE);

  return {
    startDate,
    endDate,
  };
};

export const getBMIPeriod = (bmi: number | string) => {
  if (!bmi) return '';

  if (typeof bmi === 'string') {
    bmi = Number(bmi);
  }

  if (bmi < 18.5) {
    return 'UNDER';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'NORMAL';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'OVER';
  } else if (bmi >= 30 && bmi < 34.9) {
    return 'OBESITY_CLASS_I';
  } else if (bmi >= 35 && bmi < 39.9) {
    return 'OBESITY_CLASS_II';
  } else if (bmi >= 40) {
    return 'OBESITY_CLASS_III';
  } else {
    return '잘못된 값입니다';
  }
};
