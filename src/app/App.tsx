import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from '@shared/redux/store';
import '../stylesheet/styles.scss';
import appRoutes from './app.routes';

Modal.setAppElement('#root');

const App = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
