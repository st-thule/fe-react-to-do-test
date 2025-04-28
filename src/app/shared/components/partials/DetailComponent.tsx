import Button from '@shared/components/partials/Button';
import { Status } from '@shared/constants/status';
import { AppDispatch, RootState } from '@shared/redux/store';
import { format } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { data, Link, useNavigate, useParams } from 'react-router-dom';
import deleteIcon from '@assets/icons/delete-icon.svg';
import editIcon from '@assets/icons/edit-icon.svg';
import { deleteTask, editTask } from '@shared/redux/actions/taskActions';
import { openModal } from '@shared/redux/actions/modalAction';
import { toast } from 'react-toastify';
import { Task } from '@shared/models/Task';

interface DetailComponentProps {
  task?: Task;
  onClose?: () => void;
}

export const DetailComponent = ({
  task: propTask,
  onClose,
}: DetailComponentProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskFromStore = useSelector((state: RootState) =>
    state.tasks.taskList.find((task) => task.id === id)
  );

  const task = propTask || taskFromStore;

  if (!task) {
    return <div>Task not found</div>;
  }
  const dispatch = useDispatch<AppDispatch>();

  return (
    <section className="section section-detail">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">{task.title}</h3>
          <Link to="/">Go Back</Link>
        </div>
        <div className="section-content">
          <p className="section-subtitle">
            Status:
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
          <p className="section-date">
            Created on: {format(new Date(task.createdAt), 'dd/MM/yyyy')}
          </p>
          <p className="section-desc">{task.description}</p>
        </div>
        <div className="section-action">
          <Button
            className="btn btn-primary btn-icon"
            icon={deleteIcon}
            onClick={() => {
              dispatch(
                openModal({
                  modalType: 'CONFIRM',
                  modalProps: {
                    title: 'Confirm delete',
                    message: 'Are you sure to delete this task?',
                    onConfirm: () => {
                      dispatch(deleteTask(task.id));
                      toast.success('Delete task successfully');
                      navigate('/');
                    },
                  },
                })
              );
            }}
          />
          <Button
            className="btn btn-primary btn-icon"
            icon={editIcon}
            onClick={() => {
              dispatch(
                openModal({
                  modalType: 'TASK_FORM',
                  modalProps: {
                    isEdit: true,
                    defaultValues: {
                      title: task.title,
                      dueDate: task.dueDate,
                      description: task.description,
                      status: task.status,
                    },
                    onSubmit: (data: {
                      title: string;
                      dueDate: string;
                      description: string;
                      status: Status;
                    }) => {
                      const updatedFields: Partial<Task> = {
                        title: data.title,
                        description: data.description,
                        status: data.status,
                        dueDate: new Date(data.dueDate).toISOString(),
                      };
                      dispatch(editTask(task.id, updatedFields));
                      toast.success('Update task successfully');
                      navigate('/');
                    },

                    onCancel: () => {},
                  },
                })
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};
