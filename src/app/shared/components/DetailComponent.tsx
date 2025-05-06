import React, { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { openModal } from '@app/store/actions/modalAction';
import deleteIcon from '@assets/icons/delete-icon.svg';
import editIcon from '@assets/icons/edit-icon.svg';
import Button from '@shared/components/partials/Button';
import { AuthContext } from '@shared/context/auth.context';
import { Task } from '@shared/models/Task';
import { taskService } from '@shared/services/task.service';
import { formatDate } from '@shared/utils/format';
import { Status } from '@shared/utils/status';
import { StatusTask } from './StatusTask';
import { useDispatch } from 'react-redux';

interface DetailComponentProps {
  task?: Task;
  onClose?: () => void;
}

export const DetailComponent = ({ task: propTask }: DetailComponentProps) => {
  const { id } = useParams<{ id: string }>();
  const [taskDetail, setTaskDetail] = useState<Task>(null);
  const user = useContext(AuthContext);
  const userId = user.getCurrentUserId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchTaskDetail() {
    try {
      const task = await taskService.getTaskById(id);
      if (task) {
        setTaskDetail(task);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  async function handleDelete(taskId: string) {
    await taskService.deleteTask({ taskId, userId });
  }

  async function handleUpdate(taskId: string, updatedFields: Partial<Task>) {
    await taskService.updateTask(taskId, updatedFields);
  }
  return (
    <section className="section section-detail">
      <div className="section-header">
        <h3 className="section-title">{taskDetail.title}</h3>
        <Link to="/">Go Back</Link>
      </div>
      <div className="section-content">
        <StatusTask className="section-subtitle" status={taskDetail.status} />
        <p className="section-date">
          Created on: {formatDate(taskDetail.createdAt)}
        </p>
        <p className="section-desc">{taskDetail.description}</p>
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
                    handleDelete(taskDetail.id);
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
                    title: taskDetail.title,
                    dueDate: taskDetail.dueDate,
                    description: taskDetail.description,
                    status: taskDetail.status,
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
                    handleUpdate(taskDetail.id, updatedFields);
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
    </section>
  );
};
