import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '#/App';

import Landing from '#/pages/Landing';
import SignUp from '#/pages/SignUp';
import Dashboard from '#/pages/Dashboard';

import { store } from '#stores/store';

import '#/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: 'login',
    element: <Landing />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
