import LayoutComponents from '@/layout/index';
import Login from '@/pages/login/index';
import { createBrowserRouter } from 'react-router-dom';
import Error404 from '@/pages/404/index';
import User from '@/pages/user/index';

const routes = [
  {
    path: '/',
    element: <LayoutComponents />,
    children: [
      {
        path: 'user',
        element: <User />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
];

export const router = createBrowserRouter(routes);
