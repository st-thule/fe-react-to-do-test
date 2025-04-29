import { format, isToday } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

import { TaskChart } from '@app/pages/dashboard/components/TaskChart';
import completeTask from '@assets/icons/complete-task.svg';
import completedIcon from '@assets/icons/completed-icon.svg';
import pendingIcon from '@assets/icons/pending-icon.svg';
import { CardComponent } from '@shared/components/Card';
import { HeaderAddTask } from '@shared/components/HeaderAddTask';
import { Task } from '@shared/models/Task';
import { RootState } from '@shared/redux/store';
import { Status } from '@shared/utils/status';
import Header from '../components/Header';

const DashBoard = () => {
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userId = currentUser.id;

  const recentTasks = [...tasks]
    .filter((task) => task.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
  //define vào service (đặt file là ...service- thay vì tương tác với endppint thì với localStorage, để tránh data lớn)

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
  //define vào service (đặt file là ...service- thay vì tương tác với endppint thì với localStorage, để tránh data lớn)
  const groupedTasks = groupTasksByDate(recentTasks);

  const completedTasks = tasks.filter((task) => task.status === Status.DONE);

  return (
    <div className="dashboard-page">
      <div className="container">
        <Header />
        <div className="dashboard-content">
          <section className="section section-todos">
            <div className="section-header">
              <div className="section-title">
                <img src={pendingIcon} alt="pending icon" />
                <h2 className="title">To-Do</h2>
              </div>
              <HeaderAddTask tasks={tasks} userId={userId} />
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

export default DashBoard;
