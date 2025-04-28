import { format, isToday } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TaskChart } from '@app/pages/dashboard/components/TaskChart';
import completeTask from '@assets/icons/complete-task.svg';
import completedIcon from '@assets/icons/completed-icon.svg';
import pendingIcon from '@assets/icons/pending-icon.svg';
import handWave from '@assets/images/hand-wave.png';
import { CardComponent } from '@shared/components/partials/Card';
import { HeaderAddTask } from '@shared/components/partials/HeaderAddTask';
import { Task } from '@shared/models/Task';
import { RootState } from '@shared/redux/store';
import { Status } from '@shared/utils/status';

export const DashBoard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userEmail = currentUser?.email;

  const recentTasks = [...tasks]
    .filter((task) => task.userEmail === userEmail)
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

  const completedTasks = tasks.filter(
    (task) => task.status === Status.COMPLETED
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2 className="title">Welcome {currentUser?.fullName || 'Guest'}</h2>
          <img src={handWave} alt="hand wave" />
        </div>
        <div className="dashboard-content">
          <section className="section section-todos">
            <div className="section-header">
              <div className="section-title">
                <img src={pendingIcon} alt="pending icon" />
                <h2 className="title">To-Do</h2>
              </div>
              <HeaderAddTask tasks={tasks} userEmail={userEmail} />
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
                            isLink={true}
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
              <TaskChart tasks={tasks} />
            </section>
            <section className="section-completed">
              <div className="section-header">
                <div className="section-title">
                  <img src={completedIcon} alt="completed icon" />
                  <h2 className="title">Completed Task</h2>
                </div>
              </div>
              <ul className="list-tasks">
                {completedTasks.map((task) => (
                  <CardComponent
                    className=""
                    task={task}
                    key={task.id}
                    isLink={true}
                  />
                ))}
              </ul>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};
