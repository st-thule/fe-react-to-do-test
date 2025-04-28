import { format } from 'date-fns';

export const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'dd/MM/yyyy');
};
