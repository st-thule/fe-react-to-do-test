import { Status } from '@shared/constants/status';
import { Task } from '@shared/models/Task';
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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
      {isLink ? (
        <Link to={`/detail/${task.id}`}>
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
              <p className="card-status">
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
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </p>
              <p className="card-date">
                Created on: {format(new Date(task.createdAt), 'dd/MM/yyyy')}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <Link to="">
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
              <p className="card-status">
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
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </p>
              <p className="card-date">
                Created on: {format(new Date(task.createdAt), 'dd/MM/yyyy')}
              </p>
            </div>
          </div>
        </Link>
      )}
    </li>
  );
};
