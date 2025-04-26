import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import '../stylesheet/styles.scss';
import appRoutes from './app.routes';

const App = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
