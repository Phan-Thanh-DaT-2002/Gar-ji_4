import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from './layouts/homeLayout';

import ViewProfile from './components/viewProfile/viewProfile';
import UpdateProfile from './components/updateProfile';
import ChangePassword from './components/changePassword/changePassword';
import GarageOwnerList from './components/GarageOwner/Garage-owner-list/list'
import GarageServicesList from './components/GarageServices/GarageServicesList/GarageServicesList'
import GarageManagementList from './components/GarageManagement/GarageList/GarageList'

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

      {
        path: '/garage-owner',
        element: < GarageOwnerList/>,
      },
      {
        path: '/garage-staff',
        element: <GarageManagementList />,
      },
      {
        path: '/garage-services',
        element: <GarageServicesList />,
      },
    ],
  },
]);

export default router;
