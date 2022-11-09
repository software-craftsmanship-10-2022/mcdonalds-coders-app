export const useSessionStorage = () => {
  function getSessionStorageItem<T>(key: string): T | undefined {
    if (!sessionStorage) {
      return undefined;
    }

    /* eslint-disable-next-line @typescript-eslint/ban-types */
    const value: string | null = sessionStorage.getItem(key);

    if (value === null || value === 'undefined') {
      return undefined;
    }

    return JSON.parse(value) as T;
  }

  function setSessionStorageItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  function removeSessionStorageItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  function clearSessionStorage(): void {
    sessionStorage.clear();
  }

  return {
    clearSessionStorage,
    getSessionStorageItem,
    removeSessionStorageItem,
    setSessionStorageItem,
  };
};
