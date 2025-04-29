import React from 'react';

import dashboardRoute from '@app/pages/dashboard/dashboard.routes';
import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import taskRoutes from './tasks/task.routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: '',
    element: Page,
    children: [...dashboardRoute, ...taskRoutes],
  },
];

export default pageRoutes;
