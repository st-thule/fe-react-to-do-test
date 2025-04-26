import { RouteObject } from 'react-router-dom';
import { Page } from './Page';
import React from 'react';
import dashboardRoute from './dashboard/dashboard.routes';
import detailRoutes from './detail-task/detail.routes';
import loginRoute from './login/login.routes';
import registerRoute from './register/register.routes';
import myTaskRoutes from './my-task/my-Task.routes';

const pageRoutes: RouteObject[] = [
  {
    path: '',
    element: React.createElement(Page),
    children: [
      ...dashboardRoute,
      ...detailRoutes,
      ...loginRoute,
      ...registerRoute,
      ...myTaskRoutes,
      ...registerRoute,
    ],
  },
];

export default pageRoutes;
