import { Status } from '@shared/constants/status';

export interface Task {
  id: string;
  title: string;
  status: Status;
  description: string;
  userEmail: string;
  createdAt: string;
  dueDate: string;
}
