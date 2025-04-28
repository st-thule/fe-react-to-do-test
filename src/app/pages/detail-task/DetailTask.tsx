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
import { DetailComponent } from '@shared/components/partials/DetailComponent';

interface DetailTaskProps {
  task?: Task;
  onClose?: () => void;
}

export const DetailTask = ({ task: propTask, onClose }: DetailTaskProps) => {
  return <DetailComponent/>;
};
