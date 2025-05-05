import React from 'react';
import { useSelector } from 'react-redux';
import { format, isToday } from 'date-fns';

import { CardComponent } from '@shared/components/Card';
import { RootState } from '@app/store';
import { Task } from '@shared/models/Task';

const TaskList = () => {
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

  return (
    <>
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
                {todayLabel && <p className="group-today">{todayLabel}</p>}
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
    </>
  );
};

export default TaskList;
