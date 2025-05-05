import { User } from '@shared/models/User';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  removeItemFromLocalStorage,
  LocalStorageKeys,
} from '@core/helpers/storage.helper';

class UserService {
  private getUsers(): User[] {
    return getDataFromLocalStorage<User[]>(LocalStorageKeys.USERS, []);
  }

  private saveUsers(users: User[]): void {
    setDataToLocalStorage(LocalStorageKeys.USERS, users);
  }

  async register(newUser: User): Promise<void> {
    const users = this.getUsers();

    const isEmailExist = users.some((user) => user.email === newUser.email);
    if (isEmailExist) {
      throw new Error('Email already exists');
    }

    const updatedUsers = [...users, newUser];
    this.saveUsers(updatedUsers);
  }

  async login(email: string, password: string): Promise<User> {
    const users = this.getUsers();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setDataToLocalStorage(LocalStorageKeys.CURRENT_USER, foundUser);
      return foundUser;
    }

    return null;
  }

  async logout(): Promise<void> {
    removeItemFromLocalStorage(LocalStorageKeys.CURRENT_USER);
  }

  async getCurrentUser(): Promise<User> {
    return getDataFromLocalStorage<User | null>(
      LocalStorageKeys.CURRENT_USER,
      null
    );
  }

  async getUserIdByEmail(email: string): Promise<string> {
    const users = this.getUsers();
    const user = users.find((user) => user.email === email);
    return user?.id ?? null;
  }

  async getUserInfoById(userId: string): Promise<User> {
    const users = this.getUsers();
    return users.find((user) => user.id === userId) ?? null;
  }
}

export default new UserService();
