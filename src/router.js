import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from './layouts/homeLayout';

import ViewProfile from './components/viewprofile/viewprofile';
import UpdateProfile from './components/updateProfile';
import ChangePassword from './components/changePassword/changePassword';
import Login from './components/login/login.jsx';
import GarageOwnerList from './components/GarageOwner/Garage-owner-list/list';

import GarageServicesList from './components/GarageServices/GarageServicesList/GarageServicesList';
import GarageManagementList from './components/GarageManagement/GarageList/GarageList';
import Create from './components/GarageOwner/Garage-owner-create/Create.jsx';

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
        path: '/garage',
        element: <GarageManagementList />,
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/garage-owner',
        element: <GarageOwnerList />,
      },
      {
        path: '/garage-services',
        element: <GarageServicesList />,
      },
      {
        path: '/garage-owner-create',
        element: <Create />,
      },
    ],
  },
]);

export default router;
