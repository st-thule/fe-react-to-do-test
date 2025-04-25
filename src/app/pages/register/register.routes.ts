import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Register } from '@app/pages/register/Register';

const registerRoute: RouteObject[] = [
  {
    path: '/register',
    element: React.createElement(Register),
  },
];

export default registerRoute;
