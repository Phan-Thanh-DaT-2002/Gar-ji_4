import React from 'react';

import { RouterProvider } from 'react-router-dom';
import router from './router';

import HomeLayout from './layouts/homeLayout';

function App() {
  return (
    <RouterProvider router={router}>
      <HomeLayout />
    </RouterProvider>
  );
}

export default App;
