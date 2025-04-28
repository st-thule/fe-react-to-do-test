import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Page } from '@app/pages/Page';
import authRoutes from '@app/pages/auth/auth.routes';
import dashboardRoute from '@app/pages/dashboard/dashboard.routes';
import detailRoutes from '@app/pages/detail-task/detail.routes';
import myTaskRoutes from '@app/pages/my-task/my-task.routes';
import ProtectedRoute from '@shared/routes/ProtectedRoute';

const pageRoutes: RouteObject[] = [
  ...authRoutes,
  {
    path: '',
    element: React.createElement(Page),
    children: [
      {
        element: React.createElement(ProtectedRoute),
        children: [...dashboardRoute, ...detailRoutes, ...myTaskRoutes],
      },
    ],
  },
];

export default pageRoutes;
