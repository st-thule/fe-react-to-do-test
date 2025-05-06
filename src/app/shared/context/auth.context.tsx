import React from 'react';
import { createContext } from 'react';

import {
  getDataFromLocalStorage,
  LocalStorageKeys,
  setDataToLocalStorage,
} from '@app/core/helpers/storage.helper';
import { User } from '@shared/models/User';
import { ReactNode, useEffect, useState } from 'react';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUserSession: (user: User) => void;
  clearUserSession: () => void;
  getCurrentUserId: () => string | null;
  isUserLoggedIn: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUserSession: () => {},
  clearUserSession: () => {},
  getCurrentUserId: () => null,
  isUserLoggedIn: () => false,
});

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = getDataFromLocalStorage(
      LocalStorageKeys.CURRENT_USER,
      null
    );

    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const setUserSession = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    setDataToLocalStorage(LocalStorageKeys.CURRENT_USER, user);
  };

  const clearUserSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    setDataToLocalStorage(LocalStorageKeys.CURRENT_USER, user);
  };

  const getCurrentUserId = (): string => {
    const currentUser = getDataFromLocalStorage(
      LocalStorageKeys.CURRENT_USER,
      null
    );
    return currentUser?.id;
  };

  const isUserLoggedIn = (): boolean => {
    return !!getDataFromLocalStorage(LocalStorageKeys.CURRENT_USER, null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUserSession,
        clearUserSession,
        getCurrentUserId,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
