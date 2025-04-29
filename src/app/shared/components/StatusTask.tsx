import React from 'react';

import { Status } from '@shared/utils/status';
import { formatStatus } from '@shared/utils/format';

interface IStatusProps {
  className?: string;
  status: Status;
}

export const StatusTask: React.FC<IStatusProps> = ({ className, status }) => {
  return (
    <p className={className}>
      Status: <span className={`status-${status}`}>{formatStatus(status)}</span>
    </p>
  );
};
