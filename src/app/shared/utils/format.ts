import { format } from 'date-fns';

import { statusLabel } from '@shared/constants/status';

export const formatStatus = (status: string): string => {
  return statusLabel[status];
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'dd/MM/yyyy');
};
