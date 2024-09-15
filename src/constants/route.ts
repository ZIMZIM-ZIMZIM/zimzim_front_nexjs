const ROUTE = {
  MAIN_PAGE: '/user/dashboard',
  SIGN_UP: '/auth/signup',
  USER: '/user',
  LOGIN: '/auth/login',
  EXERCISE: {
    DEFAULT: '/user/exercise/list',
    LIST: '/user/exercise/list',
    POST: '/user/exercise/post',
    DETAIL: '/user/exercise/detail/:id',
    UPDATE: '/user/exercise/update/:id',
  },
  WATER: {
    DEFAULT: '/user/water/list',
    LIST: '/user/water/list',
    POST: '/user/water/post',
    DETAIL: '/user/water/detail/:id',
    UPDATE: '/user/water/update/:id',
  },
};

export default ROUTE;
