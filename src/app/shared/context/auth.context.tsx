import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@shared/models/User';
import userService from '@shared/services/user.service';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (user: User) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = userService.getCurrentUser();
    if (storedUser) {
      setCurrentUser(await storedUser);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = userService.login(email, password);
    if (user) {
      setCurrentUser(await user);
      return true;
    }
    return false;
  };

  const logout = () => {
    userService.logout();
    setCurrentUser(null);
  };

  const register = (user: User): boolean => {
    try {
      userService.register(user);
      return true;
    } catch (error) {
      console.error('Register error:', (error as Error).message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
