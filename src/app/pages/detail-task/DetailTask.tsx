import React from 'react';

import { DetailComponent } from '@shared/components/partials/DetailComponent';
import { Task } from '@shared/models/Task';
interface DetailTaskProps {
  task?: Task;
  onClose?: () => void;
}

export const DetailTask = ({ task: propTask, onClose }: DetailTaskProps) => {
  return (
    <div className="dashboard">
      <div className="container">
        <DetailComponent />
      </div>
    </div>
  );
};
