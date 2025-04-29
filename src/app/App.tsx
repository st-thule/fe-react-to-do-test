import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useRoutes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from '@shared/redux/store';
import '../stylesheet/styles.scss';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';
import appRoutes from './app.routes';

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
