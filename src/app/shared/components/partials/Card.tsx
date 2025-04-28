import React from 'react';
import { Link } from 'react-router-dom';

import { Status } from '@shared/utils/status';
import { Task } from '@shared/models/Task';
import { formatDate, formatStatus } from '@shared/utils/format';

interface ICardProps {
  className: string;
  task: Task;
  isLink?: boolean;
}
export const CardComponent: React.FC<ICardProps> = ({
  className,
  task,
  isLink = false,
}) => {
  return (
    <li className="list-item">
      <Link to={isLink ? `/detail/${task.id}` : ''} className="card">
        <div className="card-icon">
          <div
            className={`icon ${
              task.status === Status.NO_STARTED
                ? 'status-start'
                : task.status === Status.IN_PROGRESS
                ? 'status-progress'
                : 'status-done'
            }`}
          ></div>
        </div>
        <div className="card-content">
          <h4 className="card-title">{task.title}</h4>
          <p className="card-desc">{task.description}</p>
          <div className="card-detail">
            <p className="card-status status">
              Status:{' '}
              <span
                className={
                  task.status === Status.NO_STARTED
                    ? 'status-start'
                    : task.status === Status.IN_PROGRESS
                    ? 'status-progress'
                    : 'status-done'
                }
              >
                {formatStatus(task.status)}
              </span>
            </p>
            <p className="card-date">
              Created on: {formatDate(task.createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
