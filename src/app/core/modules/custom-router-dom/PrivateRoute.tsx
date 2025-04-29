import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '@shared/redux/store';

export const PrivateRoute = ({ component: Wrapped }) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return currentUser ? <Wrapped /> : <Navigate to="/auth/login" replace />;
};
