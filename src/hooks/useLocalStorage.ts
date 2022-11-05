// Manage values stored in local storage
const useLocalStorage = () => {
  const getStorageItem = (key: string): Record<string, unknown> | string | undefined => {
    const value = localStorage.getItem(key);

    // Return value if exists & is valid
    if (value && value !== 'undefined') {
      return JSON.parse(value);
    }

    return null;
  };

  const setStorageItem = (key: string, value: Record<string, unknown>): void =>
    { localStorage.setItem(key, JSON.stringify(value)); };

  const removeStorageItem = (key: string): void => { localStorage.removeItem(key); };

  return {getStorageItem, setStorageItem, removeStorageItem};
};

export default useLocalStorage;
