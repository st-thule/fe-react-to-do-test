import { format } from 'date-fns';

import {
  getDataFromLocalStorage,
  LocalStorageKeys,
  setDataToLocalStorage,
} from '@app/core/helpers/storage.helper';
import { Task } from '@shared/models/Task';
import { SortKey } from '@shared/utils/sort';
import { Status } from '@shared/utils/status';
import { paginate } from '@shared/utils/pagination';

interface GetAllTasksOptions {
  page?: number;
  pageSize?: number;
  sortOrder?: SortKey;
  status?: Status;
  keyword?: string;
}

class TaskService {
  private getTasks(): Task[] {
    const tasks = getDataFromLocalStorage(LocalStorageKeys.TASKS, []);
    return tasks;
  }

  private saveTasks(tasks: Task[]) {
    setDataToLocalStorage(LocalStorageKeys.TASKS, tasks);
  }

  async addTask(task: Task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  async updateTask(taskId: string, updateTask: Partial<Task>) {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== 1) {
      tasks[index] = { ...tasks[index], ...updateTask };
      this.saveTasks(tasks);
    }
  }

  async deleteTask(taskId: string, userId: string) {
    const tasks = this.getTasks().filter(
      (task) => !(task.id === taskId && task.userId === userId)
    );

    this.saveTasks(tasks);
  }

  async getTaskById(taskId: string) {
    return this.getTasks().find((task) => task.id === taskId);
  }

  async getTasksByUser(userId: string, options?: GetAllTasksOptions) {
    const {
      page = 1,
      pageSize = 10,
      sortOrder = SortKey.ALL,
      status = Status.NEW,
      keyword = '',
    } = options || {};

    let tasks = this.getTasks().filter((task) => task.userId === userId);
    if (keyword.trim()) {
      const word = keyword.trim().toLowerCase();
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(word));
    }

    if (status === Status.DONE) {
      tasks = tasks.filter((task) => task.status === Status.DONE);
    }

    tasks.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === SortKey.NEWEST ? timeB - timeA : timeA - timeB;
    });

    const recentTasks = [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    const groupedByDate: { [date: string]: Task[] } = {};
    recentTasks.forEach((task) => {
      const dateKey = format(new Date(task.createdAt), 'dd MMMM yyyy');
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(task);
    });

    const { paginatedItems, totalItems, startIndex, endIndex } = paginate({
      items: tasks,
      currentPage: page,
      itemsPerPage: pageSize,
    });

    return {
      paginate: {
        totalItems,
        startIndex,
        endIndex,
        tasks: paginatedItems,
      },
      groupedByDate,
    };
  }
}

export const taskService = new TaskService();
