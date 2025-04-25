import React from 'react';
import { RouteObject } from 'react-router-dom';

import { DashBoard } from '@app/pages/dashboard/DashBoard';
const dashboardRoute: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(DashBoard),
  },
];

export default dashboardRoute;
