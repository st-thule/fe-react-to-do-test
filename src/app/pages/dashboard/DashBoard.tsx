import { isToday, format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/redux/store';
import { Task } from '@shared/models/Task';
import { CardComponent } from '@shared/components/partials/Card';

import pendingIcon from '@assets/icons/pending-icon.svg';
import completeTask from '@assets/icons/complete-task.svg';
import completedIcon from '@assets/icons/completed-icon.svg';
import handWave from '@assets/images/hand-wave.png';
import { Status } from '@shared/constants/status';

// Dữ liệu giả để test UI
const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Attend Birthday Party',
    description:
      'Buy gifts on the way and pick up cake from the bakery at 6PM.',
    status: Status.NO_STARTED,
    userEmail: 'user@example.com',
    createdAt: '2025-04-26T10:00:00Z',
    dueDate: '2025-04-27T18:00:00Z',
  },
  {
    id: '2',
    title: 'Landing Page Design',
    description:
      'Get the work done by EOD and discuss with client before leaving.',
    status: Status.IN_PROGRESS,
    userEmail: 'user@example.com',
    createdAt: '2025-04-26T09:00:00Z',
    dueDate: '2025-04-27T17:00:00Z',
  },
  {
    id: '3',
    title: 'Final Product Review',
    description:
      'Make sure everything is functioning and all necessities are met.',
    status: Status.IN_PROGRESS,
    userEmail: 'user@example.com',
    createdAt: '2025-04-26T14:00:00Z',
    dueDate: '2025-04-28T12:00:00Z',
  },
  {
    id: '4',
    title: 'Review Code',
    description: 'Review the pull request and provide feedback by EOD.',
    status: Status.IN_PROGRESS,
    userEmail: 'user@example.com',
    createdAt: '2025-04-26T12:00:00Z',
    dueDate: '2025-04-27T23:59:59Z',
  },
  {
    id: '5',
    title: 'Update Documentation',
    description: 'Update the API docs with the latest changes.',
    status: Status.NO_STARTED,
    userEmail: 'user@example.com',
    createdAt: '2025-04-25T08:00:00Z',
    dueDate: '2025-04-30T00:00:00Z',
  },
  {
    id: '6',
    title: 'Prepare Presentation',
    description: 'Prepare slides for the team meeting.',
    status: Status.NO_STARTED,
    userEmail: 'user@example.com',
    createdAt: '2025-04-25T07:00:00Z',
    dueDate: '2025-04-29T00:00:00Z',
  },
  {
    id: '7',
    title: 'Schedule Client Call',
    description: 'Set up a call with the client to discuss project updates.',
    status: Status.NO_STARTED,
    userEmail: 'user@example.com',
    createdAt: '2025-04-24T15:00:00Z',
    dueDate: '2025-04-28T00:00:00Z',
  },
];

export const DashBoard: React.FC = () => {
  // const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  // const userEmail = currentUser?.email || 'guest@example.com';

  const recentTasks = [...dummyTasks]

    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const groupTasksByDate = (tasks: Task[]) => {
    const grouped: { [key: string]: Task[] } = {};
    tasks.forEach((task) => {
      const date = format(new Date(task.createdAt), 'dd MMMM');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(task);
    });
    return grouped;
  };

  const groupedTasks = groupTasksByDate(recentTasks);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          {/* <h2 className="title">Welcome {currentUser?.fullName || 'Guest'}</h2> */}
          {/* <img src={handWave} alt="hand wave" /> */}
        </div>
        <div className="dashboard-content">
          <section className="section section-todos">
            <div className="section-header">
              <div className="section-title">
                <img src={pendingIcon} alt="pending icon" />
                <h2 className="title">To-Do</h2>
              </div>
              <div className="section-action">
                <p className="action" onClick={() => {}}>
                  +<span>Add task</span>
                </p>
              </div>
            </div>
            <div className="section-groups">
              {recentTasks.length === 0 ? (
                <p>No task available</p>
              ) : (
                Object.entries(groupedTasks).map(([date, tasksForDate]) => {
                  const dateObj = new Date(tasksForDate[0].createdAt);
                  const todayLabel = isToday(dateObj) ? 'Today' : '';
                  return (
                    <div key={date} className="group">
                      <div className="group-title">
                        <h3 className="group-date">{date}</h3>
                        {todayLabel && (
                          <p className="group-today">{todayLabel}</p>
                        )}
                      </div>
                      <ul className="list-tasks">
                        {tasksForDate.map((task) => (
                          <CardComponent
                            className=""
                            task={task}
                            key={task.id}
                          />
                        ))}
                      </ul>
                      <div className="group-divide"></div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
          <section className="section section-summary">
            <section className="section-chart">
              <div className="section-header">
                <div className="section-title">
                  <img src={completeTask} alt="completed icon" />
                  <h2 className="title">Task Status</h2>
                </div>
              </div>
            </section>
            <section className="section-completed">
              <div className="section-header">
                <div className="section-title">
                  <img src={completedIcon} alt="completed icon" />
                  <h2 className="title">Completed Task</h2>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};
