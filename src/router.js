import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from './layouts/homeLayout';

import ViewProfile from './components/viewProfile/viewProfile';
import UpdateProfile from './components/updateProfile';
import ChangePassword from './components/changePassword/changePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <ViewProfile />,
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
      // {
      //   path: '/login',
      //   element: <Login />,
      // },
    ],
  },
]);

export default router;
