import { Task } from '@shared/models/Task';
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASKS,
} from './type/taskActionTypes';

export const addTask = (task: Task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const editTask = (taskId: string, updateFields: Partial<Task>) => {
  return {
    type: EDIT_TASK,
    payload: { taskId, updateFields },
  };
};

export const deleteTask = (taskId: string) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

export const setTasks = (tasks: Task[]) => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};
