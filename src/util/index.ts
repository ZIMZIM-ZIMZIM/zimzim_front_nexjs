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
