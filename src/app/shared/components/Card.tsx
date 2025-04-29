import React from 'react';
import { Link } from 'react-router-dom';

import { Status } from '@shared/utils/status';
import { Task } from '@shared/models/Task';
import { formatDate } from '@shared/utils/format';
import { StatusTask } from './StatusTask';

interface ICardProps {
  className: string;
  task: Task;
  isLink?: boolean;
}
export const CardComponent: React.FC<ICardProps> = ({
  task,
  isLink = false,
}) => {
  return (
    <li className="list-item">
      <Link to={isLink ? `/detail/${task.id}` : ''} className="card">
        <div className="card-icon">
          <div className={`icon status-${task.status}`}></div>
        </div>
        <div className="card-content">
          <h4 className="card-title">{task.title}</h4>
          <p className="card-desc">{task.description}</p>
          <div className="card-detail">
            <StatusTask status={task.status} className="card-status status" />
            <p className="card-date">
              Created on: {formatDate(task.createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
