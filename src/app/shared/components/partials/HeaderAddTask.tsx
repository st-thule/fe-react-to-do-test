import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Task } from '@shared/models/Task';
import { openModal } from '@shared/redux/actions/modalAction';
import { addTask } from '@shared/redux/actions/taskActions';
import { ModalTypes } from '@shared/utils/modal-type';
import { Status } from '@shared/utils/status';

interface IHeaderAddTaskProps {
  userEmail: string;
  tasks: Task[];
  onClick?: () => void;
}

export const HeaderAddTask: React.FC<IHeaderAddTaskProps> = ({
  userEmail,
  tasks,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="section-action">
      <p
        className="action"
        onClick={() => {
          dispatch(
            openModal({
              modalType: ModalTypes.TASK_FORM,
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
        }}
      >
        +<span>Add Task</span>
      </p>
    </div>
  );
};
