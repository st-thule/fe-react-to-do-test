import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import React from 'react';

const Task = React.lazy(() => import('./containers/Task'));
const DetailTask = React.lazy(() => import('./containers/DetailTask'));
const MyTask = React.lazy(() => import('./containers/MyTask'));
const taskRoutes: PageRoute[] = [
  {
    path: 'tasks',
    element: Task,
    isProtected: true,
    children: [
      {
        path: 'my-task',
        element: MyTask,
      },
      {
        path: ':id',
        element: DetailTask,
      },
    ],
  },
];

export default taskRoutes;
