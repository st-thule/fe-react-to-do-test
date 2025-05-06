import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Task } from '@shared/models/Task';
import { openModal } from '@app/store/actions/modalAction';
import { ModalTypes } from '@shared/utils/modal-type';
import { Status } from '@shared/utils/status';
import { taskService } from '@shared/services/task.service';

interface IHeaderAddTaskProps {
  userId: string;
  tasks: Task[];
  onClick?: () => void;
}

export const HeaderAddTask: React.FC<IHeaderAddTaskProps> = ({
  userId,
  tasks,
}) => {
  const dispatch = useDispatch();
  const handleAddTask = async (newTask: Task) => {
    try {
      await taskService.addTask(newTask);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
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
                  status: Status.NEW,
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
                    userId: userId,
                    createdAt: new Date().toISOString(),
                    dueDate: new Date(data.dueDate).toISOString(),
                  };
                  handleAddTask(newTask);
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
