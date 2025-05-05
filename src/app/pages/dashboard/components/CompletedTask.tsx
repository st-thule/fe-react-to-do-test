import React from 'react';
import { useSelector } from 'react-redux';

import { CardComponent } from '@shared/components/Card';
import { RootState } from '@app/store';
import { Status } from '@shared/utils/status';
import { Task } from '@shared/models/Task';

interface CompletedTask {
  tasks: Task[];
}
const CompletedTask = () => {
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const completedTasks = tasks.filter((task) => task.status === Status.DONE);
  return (
    <ul className="list-tasks">
      {completedTasks.map((task) => (
        <CardComponent className="" task={task} key={task.id} isLink={true} />
      ))}
    </ul>
  );
};

export default CompletedTask;
