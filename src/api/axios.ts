import axios from 'axios';

let navigateFunction: (path: string) => void;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { url } = config;

    if (!url?.startsWith('auth/sign-up')) {
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
            `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
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
