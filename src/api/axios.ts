import axios from 'axios';

import API_ENDPOINT from '#/constants/api';

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
      const originalRequest = error.config;
      const { status } = error.response;

      if (status === 401 || status === 403) {
        try {
          const response = await axios.post(
            `${import.meta.env.NEXT_PUBLIC_SERVER_URL}${API_ENDPOINT.AUTH.REFRESH_TOKEN}`,
          );

          originalRequest.headers['Authorization'] =
            `Bearer ${response.data.token}`;

          return axiosInstance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
