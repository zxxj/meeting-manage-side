import LayoutComponents from '@/layout/index';
import Login from '@/pages/login/index';
import { createBrowserRouter } from 'react-router-dom';
import Error404 from '@/pages/404/index';
import User from '@/pages/user/index';
import MeetingRoom from '../pages/metting-room';

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
        path: 'meetingRoom',
        element: <MeetingRoom />,
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
