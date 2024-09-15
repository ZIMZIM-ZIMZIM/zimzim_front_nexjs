const API_ENDPOINT = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGN_UP: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USER: {
    INFO: '/user/info',
  },
  EXERCISE: {
    EXERCISE: '/exercise',
    LIST: '/exercise/list',
    DETAIL: (id: string) => `/exercise/detail/${id}`,
    DETAILS: '/exercise/details',
  },
  WATER: {
    WATER: '/water',
    LIST: '/water/list',
    POST: '/water',
    UPDATE: (id: string) => `/water/${id}`,
    DELETE: `/water`,
  },
};

export default API_ENDPOINT;
