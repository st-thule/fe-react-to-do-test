import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { Status } from '@shared/utils/status';
import { Task } from '@shared/models/Task';

interface ITaskChartProps {
  tasks: Task[];
}
export const TaskChart: React.FC<ITaskChartProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === Status.COMPLETED
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === Status.IN_PROGRESS
  ).length;
  const notStartedTasks = tasks.filter(
    (task) => task.status === Status.NO_STARTED
  ).length;

  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPercentage =
    totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const notStartedPercentage =
    totalTasks > 0 ? Math.round((notStartedTasks / totalTasks) * 100) : 0;
  return (
    <div className="chart-task">
      <ul className="list-charts">
        <li className="progress-chart">
          <CircularProgressbar
            value={completedPercentage}
            text={`${completedPercentage} %`}
            styles={buildStyles({
              pathColor: '#05a301',
              textColor: '#000000',
              trailColor: '#D9D9D9',
              pathTransitionDuration: 0.5,
            })}
          />
          <p>Completed</p>
        </li>

        <li className="progress-chart">
          <CircularProgressbar
            value={inProgressPercentage}
            text={`${inProgressPercentage} %`}
            styles={buildStyles({
              pathColor: '#0225ff',
              textColor: '#000000',
              trailColor: '#D9D9D9',
              pathTransitionDuration: 0.5,
            })}
          />
          <p>In progress</p>
        </li>

        <li className="progress-chart">
          <CircularProgressbar
            value={notStartedPercentage}
            text={`${notStartedPercentage} %`}
            styles={buildStyles({
              pathColor: '#f21e1e',
              textColor: '#000000',
              trailColor: '#D9D9D9',
              pathTransitionDuration: 0.5,
            })}
          />
          <p>Not Started</p>
        </li>
      </ul>
    </div>
  );
};
