import { RootState } from '@shared/redux/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@shared/redux/actions/modalAction';
import { Status } from '@shared/constants/status';
import { Task } from '@shared/models/Task';
import { addTask } from '@shared/redux/actions/taskActions';
import { toast } from 'react-toastify';
import { CardComponent } from '@shared/components/partials/Card';
import { DetailTask } from '../detail-task/DetailTask';
import { DetailComponent } from '@shared/components/partials/DetailComponent';

export const MyTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userEmail = currentUser?.email;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    dispatch(
      openModal({
        modalType: 'TASK_FORM',
        modalProps: {
          isEdit: false,
          defaultValues: {
            title: '',
            dueDate: '',
            description: '',
            status: Status.NO_STARTED,
          },
          onSubmit: (data: {
            title: string;
            dueDate: string;
            description: string;
            status: Status;
          }) => {
            const newTask: Task = {
              id: (tasks.length + 1).toString(),
              title: data.title,
              description: data.description,
              status: data.status,
              userEmail: userEmail,
              createdAt: new Date().toISOString(),
              dueDate: new Date(data.dueDate).toISOString(),
            };
            dispatch(addTask(newTask));
            toast.success('Add task successfully');
          },
        },
      })
    );
  };
  return (
    <section className="my-task">
      <div className="container">
        <section className="section section-todos">
          <div className="section-header">
            <div className="section-title">
              <h2 className="title">To-Do</h2>
            </div>
            <div className="section-action">
              <p className="action" onClick={handleAddTask}>
                +<span>Add task</span>
              </p>
            </div>
          </div>
          <ul className="list-tasks">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                style={{ cursor: 'pointer' }}
              >
                <CardComponent className="" task={task} />
              </div>
            ))}
          </ul>
        </section>
        {selectedTask && (
          <div className="detail-column">
            <DetailComponent
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          </div>
        )}
      </div>
    </section>
  );
};
