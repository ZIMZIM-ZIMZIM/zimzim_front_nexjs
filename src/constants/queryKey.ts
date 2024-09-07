const QUERY_KEYS = {
  USER: ['user'],
  EXERCISE: {
    DEFAULT: ['exercise'],
    DATE_RANE: (dateRange: string) => [
      ...QUERY_KEYS.EXERCISE.DEFAULT,
      'date-range',
      dateRange,
    ],
    LIST: () => [...QUERY_KEYS.EXERCISE.DEFAULT, 'list'],
    DETAIL: (id: string) => [...QUERY_KEYS.EXERCISE.DEFAULT, 'detail', id],
  },
};
export default QUERY_KEYS;
