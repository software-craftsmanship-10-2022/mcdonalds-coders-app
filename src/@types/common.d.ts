export type CacheHandlerType = {
  getItem<T>(key: string): Promise<T | undefined>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
  clearAll(): Promise<void>;
};
