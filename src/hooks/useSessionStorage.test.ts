import {useSessionStorage} from './useSessionStorage';

const {
  getSessionStorageItem,
  setSessionStorageItem,
  removeSessionStorageItem,
  clearSessionStorage,
} = useSessionStorage();

describe('Given a useSessionStorage hook', () => {
  test('when getSessionStorageItem is called, then it should return undefined', () => {
    const result = getSessionStorageItem('key');

    expect(result).toBeUndefined();
  });

  test('when setSessionStorageItem is called, then it should set the item in sessionStorage', () => {
    const key = 'key';
    const value = 'value';

    setSessionStorageItem(key, value);

    const result = getSessionStorageItem(key);

    expect(result).toEqual(value);
  });

  test('when removeSessionStorageItem is called, then it should remove the item from sessionStorage', () => {
    const key = 'key';
    const value = 'value';

    setSessionStorageItem(key, value);

    removeSessionStorageItem(key);

    const result = getSessionStorageItem(key);

    expect(result).toBeUndefined();
  });

  test('when clearSessionStorage is called, then it should clear the storage', () => {
    const key = 'key';
    const value = 'value';

    setSessionStorageItem(key, value);

    clearSessionStorage();

    const result = getSessionStorageItem(key);

    expect(result).toBeUndefined();
  });
});
