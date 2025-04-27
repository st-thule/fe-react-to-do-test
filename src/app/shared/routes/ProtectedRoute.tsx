// src/shared/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.ReactElement | null => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
