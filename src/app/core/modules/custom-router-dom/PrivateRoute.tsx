import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '@app/store';
import { AuthContext } from '@shared/context/auth.context';

export const PrivateRoute = ({ component: Wrapped }) => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.isUserLoggedIn();

  return currentUser ? <Wrapped /> : <Navigate to="/auth/login" replace />;
};
