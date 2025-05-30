import LayoutComponents from '@/layout/index';
import Login from '@/pages/login/index';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <LayoutComponents />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
