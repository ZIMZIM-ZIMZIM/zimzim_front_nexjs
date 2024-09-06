import API_ENDPOINT from '#/constants/api';
import axios from 'axios';
import { cookies } from 'next/headers';

let navigateFunction: (path: string) => void;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { url } = config;

    if (!url?.includes(API_ENDPOINT.AUTH.SIGN_UP)) {
      config.withCredentials = true;
    }
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
    if (navigateFunction && error.response) {
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
          navigateFunction('/login');

          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const setNavigateFunction = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

export default axiosInstance;
