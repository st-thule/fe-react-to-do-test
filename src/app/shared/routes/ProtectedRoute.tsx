import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@shared/redux/store';

const ProtectedRoute: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
