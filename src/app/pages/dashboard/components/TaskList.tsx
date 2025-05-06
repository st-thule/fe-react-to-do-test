import { format, isToday } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';

import { CardComponent } from '@shared/components/Card';
import { AuthContext } from '@shared/context/auth.context';
import { Task } from '@shared/models/Task';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(null);
  useEffect(() => {
    
  }, []);

  const authContext = useContext(AuthContext);
  const userId = authContext.getCurrentUserId();

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
