import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from '@app/store';
import '../stylesheet/styles.scss';
import appRoutes from './app.routes';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';

export const Root = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  { path: '/', Component: Root, children: renderChildren(appRoutes) },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </StrictMode>
);
