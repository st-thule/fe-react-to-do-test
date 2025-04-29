import { Status } from '@shared/utils/status';

export interface Task {
  id: string;
  title: string;
  status: Status;
  description: string;
  userId: string;
  createdAt: string;
  dueDate?: string;
}

//mấy cái auth với task toàn bộ bỏ vào apiService
