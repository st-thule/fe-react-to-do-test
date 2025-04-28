import { User } from '@shared/models/User';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
} from '@shared/redux/actions/type/authActionTypes';

export const register = (user: User) => {
  return {
    type: REGISTER,
    payload: user,
  };
};

export const login = (crendentials: { email: string; password: string }) => {
  return {
    type: LOGIN,
    payload: crendentials,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
