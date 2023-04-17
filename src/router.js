import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from './layouts/homeLayout';

import ViewProfile from './components/viewProfile/viewProfile';
import UpdateProfile from './components/updateProfile';
import ChangePassword from './components/changePassword/changePassword';
import Login from './components/login/login.jsx';
import GarageOwnerList from './components/GarageOwner/Garage-owner-list/list';
import GarageOwnerList from './components/GarageOwner/Garage-owner-list/list';
import GarageServicesList from './components/GarageServices/GarageServicesList/GarageServicesList';
import GarageManagementList from './components/GarageManagement/GarageList/GarageList';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
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
