export enum LocalStorageKeys {
  USERS = 'users',
  TODOS = 'todos',
  CURRENT_USER = 'currentUser',
}

export const getDataFromLocalStorage = <T>(
  key: LocalStorageKeys,
  defaultValue: T
): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setDataToLocalStorage = <T>(
  key: LocalStorageKeys,
  value: T
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromLocalStorage = (key: LocalStorageKeys): void => {
  localStorage.removeItem(key);
};
