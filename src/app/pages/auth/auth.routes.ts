import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Register } from '@app/pages/auth/Register';
import { Login } from '@app/pages/auth/Login';

const authRoutes: RouteObject[] = [
  {
    path: '/register',
    element: React.createElement(Register),
  },
  {
    path: '/login',
    element: React.createElement(Login),
  },
];

export default authRoutes;
