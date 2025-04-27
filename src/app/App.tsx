import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Modal from 'react-modal';

import '../stylesheet/styles.scss';
import appRoutes from './app.routes';
import { Provider } from 'react-redux';
import { store } from '@shared/redux/store';
import { ToastContainer } from 'react-toastify';

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
