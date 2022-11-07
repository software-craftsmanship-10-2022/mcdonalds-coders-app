/**
 * Get the item `key` from the local cache.
 *
 * @param key Cache item key
 * @return cache value or undefined if the item doesn't exist.
 */
async function getItem<T>(key: string): Promise<T | undefined> {
  if (!localStorage) {
    return undefined;
  }

  /* eslint-disable-next-line @typescript-eslint/ban-types */
  const value: string | null = localStorage.getItem(key);

  if (value === null || value === 'undefined') {
    return undefined;
  }

  return JSON.parse(value) as T;
}

/**
 * Create a new item in the local cache.
 *
 * @param key Item key.
 * @param value Item value
 */
async function setItem<T>(key: string, value: T): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove the item `key` of the cache.
 *
 * @param key Item key.
 */
async function removeItem(key: string): Promise<void> {
  localStorage.removeItem(key);
}

/**
 * Clear all cache
 */
async function clearAll(): Promise<void> {
  localStorage.clear();
}

export {getItem, setItem, removeItem, clearAll};
