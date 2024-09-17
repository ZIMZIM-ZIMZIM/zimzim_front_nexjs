import { useMemo } from 'react';

const useBMICaculate = (weight: number, height: number) => {
  const caculatedBMI: number = useMemo(() => {
    if (!height || !weight) return 0;

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    return parseFloat(bmi.toFixed(2)) || 0;
  }, [weight, height]);

  return {
    caculatedBMI,
  };
};

export default useBMICaculate;
