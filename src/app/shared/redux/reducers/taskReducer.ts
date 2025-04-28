import { Task } from '@shared/models/Task';
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
} from '@shared/redux/actions/type/taskActionTypes';
import {
  getDataFromLocalStorage,
  LocalStorageKeys,
  setDataToLocalStorage,
} from '@shared/utils/local-storage';

interface TaskState {
  taskList: Task[];
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: TaskState = {
  taskList: getDataFromLocalStorage<Task[]>(LocalStorageKeys.TASKS, []),
};

export const taskReducer = (
  state = initialState,
  action: Action
): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      const newTasks = [...state.taskList, action.payload];
      setDataToLocalStorage(LocalStorageKeys.TASKS, newTasks);
      return {
        ...state,
        taskList: newTasks,
      };

    case EDIT_TASK: {
      const { id, updateFields } = action.payload;
      const updatedTasks = state.taskList.map((task) =>
        task.id === id ? { ...task, ...updateFields } : task
      );
      setDataToLocalStorage(LocalStorageKeys.TASKS, updatedTasks);
      return {
        ...state,
        taskList: updatedTasks,
      };
    }

    case DELETE_TASK:
      const filteredTasks = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      setDataToLocalStorage(LocalStorageKeys.TASKS, filteredTasks);
      return {
        ...state,
        taskList: filteredTasks,
      };

    default:
      return state;
  }
};
