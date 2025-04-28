import { Status } from '@shared/utils/status';

export interface Task {
  id: string;
  title: string;
  status: Status;
  description: string;
  userEmail: string;
  createdAt: string;
  dueDate?: string;
}
