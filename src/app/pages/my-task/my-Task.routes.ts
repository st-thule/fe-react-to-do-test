import React from 'react';
import { RouteObject } from 'react-router-dom';

import { MyTask } from './MyTask';

const myTaskRoutes: RouteObject[] = [
  {
    path: '/my-task',
    element: React.createElement(MyTask),
  },
];

export default myTaskRoutes;
