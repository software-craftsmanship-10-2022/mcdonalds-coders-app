const getSessionStorageItem = <T>(key: string): T | undefined => {
  if (!sessionStorage) {
    return undefined;
  }

  const value: string | null = sessionStorage.getItem(key);

  if (value === null || value === 'undefined') {
    return undefined;
  }

  return JSON.parse(value) as T;
};

const setSessionStorageItem = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const removeSessionStorageItem = (key: string): void => {
  sessionStorage.removeItem(key);
};

const clearSessionStorage = (): void => {
  sessionStorage.clear();
};

export {
  clearSessionStorage,
  getSessionStorageItem,
  removeSessionStorageItem,
  setSessionStorageItem,
};
