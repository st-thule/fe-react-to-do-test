import React from 'react';
import { Outlet } from 'react-router-dom';

const Task = () => {
  return (
    <div className="tasks-page">
      <Outlet />
    </div>
  );
};

export default Task;
