import {
  getDataFromLocalStorage,
  LocalStorageKeys,
  setDataToLocalStorage,
} from '@app/core/helpers/storage.helper';
import { Task } from '@shared/models/Task';
import { SortKey } from '@shared/utils/sort';
import { Status } from '@shared/utils/status';
import { format, set } from 'date-fns';

interface GetAllTasksOptions {
  page?: number;
  pageSize?: number;
  sortOrder?: SortKey;
  status?: Status;
  keyword?: string;
}

class TaskServce {
  private getAll(): Task[] {
    const data = getDataFromLocalStorage(LocalStorageKeys.TASKS, []);
    return data;
  }

  private groupTasksByDate(tasks: Task[]) {
    const grouped: { [date: string]: Task[] } = {};

    tasks.forEach((task) => {
      const dateKey = format(new Date(task.createdAt), 'dd MMMM');
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });

    return grouped;
  }

  async getAllTasksByGroupDate(userId: string) {
    const tasks = this.getAll().filter((task) => task.userId === userId);

    const recentTasks = [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    const groupedTasks = this.groupTasksByDate(tasks);

    return {
      recentTasks,
      groupedTasks,
    };
  }

  async addTask(task: Task) {
    const tasks = this.getAll();
    tasks.push(task);
    setDataToLocalStorage(LocalStorageKeys.TASKS, tasks);
  }

  async updateTask(taskId: string, updatedTask: Partial<Task>) {
    const tasks = this.getAll();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      setDataToLocalStorage(LocalStorageKeys.TASKS, tasks);
    }
  }

  async deleteTask({ taskId, userId }: { taskId: string; userId: string }) {
    const tasks = this.getAll().filter(
      (task) => !(task.id === taskId && task.userId === userId)
    );
    setDataToLocalStorage(LocalStorageKeys.TASKS, tasks);
  }

  async getTaskById(taskId: string) {
    return this.getAll().find((task) => task.id === taskId);
  }

  async getAllTaskByUser(userId: string, options?: GetAllTasksOptions) {
    const {
      page = 1,
      pageSize = 10,
      sortOrder = 'desc',
      status = 'All',
      keyword = '',
    } = options || {};

    let tasks = this.getAll().filter((task) => task.userId === userId);

    if (keyword.trim()) {
      const q = keyword.trim().toLowerCase();
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(q));
    }

    if (status !== 'All') {
      tasks = tasks.filter((task) => task.status === status);
    }

    tasks.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === SortKey.NEWEST ? timeB - timeA : timeA - timeB;
    });

    const totalItems = tasks.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = tasks.slice(startIndex, endIndex);

    const recentTasks = [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    const groupedTasks = this.groupTasksByDate(tasks);

    return {
      paginatedTasks,
      totalItems,
      recentTasks,
      groupedTasks,
    };
  }
}

export const taskService = new TaskServce();
