import React from 'react';

import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';

const DashBoard = React.lazy(() => import('./containers/DashBoard'));
const dashboardRoutes: PageRoute[] = [
  {
    path: '/',
    element: DashBoard,
    isProtected: true,
  },
];

export default dashboardRoutes;
