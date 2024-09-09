const ROUTE = {
  MAIN_PAGE: '/user/dashboard',
  SIGN_UP: '/auth/signup',
  USER: '/user',
  LOGIN: '/auth/login',
  EXERCISE: {
    DEFAULT: '/user/exercise/list',
    LIST: '/user/list',
    POST: '/user/exercise/post',
    DETAIL: '/user/exercise/detail/:id',
    UPDATE: '/user/exercise/update/:id',
  },
  WATER: '/user/water',
};

export default ROUTE;
