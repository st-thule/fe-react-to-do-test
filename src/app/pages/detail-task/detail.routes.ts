import React from 'react';
import { RouteObject } from 'react-router-dom';

import { DetailTask } from './DetailTask';

const detailRoutes: RouteObject[] = [
  {
    path: '/detail/:id',
    element: React.createElement(DetailTask),
  },
];

export default detailRoutes;
