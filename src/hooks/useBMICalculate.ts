import { useMemo } from 'react';

const useBMICaculate = (weight: number, height: number) => {
  const caculatedBMI = useMemo(() => {
    if (!height || !weight) return 0;

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    return bmi.toFixed(2);
  }, [weight, height]);

  return {
    caculatedBMI,
  };
};

export default useBMICaculate;
