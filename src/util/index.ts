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
    return '저체중';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return '정상 체중';
  } else if (bmi >= 25 && bmi < 29.9) {
    return '과체중';
  } else if (bmi >= 30 && bmi < 34.9) {
    return '경도 비만';
  } else if (bmi >= 35 && bmi < 39.9) {
    return '중등도 비만';
  } else if (bmi >= 40) {
    return '고도 비만';
  } else {
    return '잘못된 값입니다';
  }
};
