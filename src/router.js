import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from './layouts/homeLayout';

import ViewProfile from './components/viewprofile/viewprofile';
import UpdateProfile from './components/updateProfile/updateProfile';
import ChangePassword from './components/changePassword/changePassword';
import Login from './components/login/login.jsx';
import GarageOwnerList from './components/GarageOwner/Garage-owner-list/list';

import GarageServicesList from './components/GarageServices/GarageServicesList/GarageServicesList';
import GarageManagementList from './components/GarageManagement/GarageList/GarageList';
import Create from './components/GarageOwner/Garage-owner-create/Create.jsx';
import OwnerView from './components/GarageOwner/Garage-owner-view/OwnerView.jsx';
import OwnerUpdate from './components/GarageOwner/Garage-owner-update/OwnerUpdate';
import ManagerDetails from './components/GarageManagement/Details/ManagerDetails';
import UpdateMana from './components/GarageManagement/UpdateManagement/UpdateMana';
import CreateServices from './components/GarageServices/GarageServicesCreate/Create_services';
import CreateManager from './components/GarageManagement/Create/create_manager';
import ServiceDetail from './components/GarageServices/GarageServicesDetails/ServiceDetail';
import UpdateServices from './components/GarageServices/GarageServicesUpdate/UpdateServices';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

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
        element: (
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/change-password',
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
      {
        path: '/garage',
        element: (
          <PrivateRoute>
            <GarageManagementList />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'manager-details',
            element: (
              <PrivateRoute>
                <ManagerDetails />
              </PrivateRoute>
            ),
          },
          {
            path: 'create-manager',
            element: (
              <PrivateRoute>
                <CreateManager />
              </PrivateRoute>
            ),
          },
          {
            path: 'manager-update',
            element: (
              <PrivateRoute>
                <UpdateMana />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: '/garage-owner',
        element: (
          <PrivateRoute>
            <GarageOwnerList />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'owner-details',
            element: (
              <PrivateRoute>
                {' '}
                <OwnerView />
              </PrivateRoute>
            ),
          },
          {
            path: 'garage-owner-create',
            element: (
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            ),
          },
          {
            path: 'owner-update',
            element: (
              <PrivateRoute>
                <OwnerUpdate />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: '/garage-services',
        element: (
          <PrivateRoute>
            <GarageServicesList />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'services-detail',
            element: (
              <PrivateRoute>
                <ServiceDetail />
              </PrivateRoute>
            ),
          },
          {
            path: 'create-services',
            element: (
              <PrivateRoute>
                <CreateServices />
              </PrivateRoute>
            ),
          },
          {
            path: 'services-update',
            element: (
              <PrivateRoute>
                <UpdateServices />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
