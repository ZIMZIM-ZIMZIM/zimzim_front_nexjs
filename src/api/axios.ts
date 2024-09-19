import axios from 'axios';

import ROUTE from '#/constants/route';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        try {
          location.replace('/ko' + ROUTE.LOGIN);

          return Promise.reject(error);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
