import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Login } from '@app/pages/login/Login';

const loginRoute: RouteObject[] = [
  {
    path: '/login',
    element: React.createElement(Login),
  },
];

export default loginRoute;
