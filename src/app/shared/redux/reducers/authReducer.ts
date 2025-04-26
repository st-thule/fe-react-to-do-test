import {
  getDataFromLocalStorage,
  LocalStorageKeys,
  setDataToLocalStorage,
} from '@shared/utils/local-storage';
import { User } from '@shared/models/User';
import { LOGIN, LOGOUT, REGISTER } from '../actions/type/authActionTypes';

interface AuthState {
  users: User[];
  currentUser: User | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initalState: AuthState = {
  users: getDataFromLocalStorage<User[]>(LocalStorageKeys.USERS, []),
  currentUser: getDataFromLocalStorage<User | null>(
    LocalStorageKeys.CURRENT_USER,
    null
  ),
};

export const authReducer = (state = initalState, action: Action): AuthState => {
  switch (action.type) {
    case REGISTER:
      const newUser: User = {
        ...action.payload,
      };

      const isEmailExist = state.users.some(
        (user) => user.email === newUser.email
      );
      if (isEmailExist) {
        throw new Error('Email is already exists');
      }
      const updatedUser = [...state.users, newUser];
      setDataToLocalStorage(LocalStorageKeys.USERS, updatedUser);

      return {
        ...state,
        users: updatedUser,
      };

    case LOGIN:
      const { email, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        setDataToLocalStorage(LocalStorageKeys.CURRENT_USER, foundUser);

        return {
          ...state,
          currentUser: foundUser,
        };
      } else {
        return state;
      }

    case LOGOUT:
      setDataToLocalStorage(LocalStorageKeys.CURRENT_USER, null);
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};
