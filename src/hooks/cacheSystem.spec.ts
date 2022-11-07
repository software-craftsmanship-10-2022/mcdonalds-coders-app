import {getItem, setItem, removeItem, clearAll} from './cacheSystem';

describe('Check the CacheSystem', () => {
  beforeEach(async () => {
    await clearAll();
  });

  it("returns undefined when the key doesn't exist", async () => {
    expect(await getItem('invalid')).toBeUndefined();
  });

  it('gets a item inserted previously', async () => {
    await setItem<number>('key1', 1);
    expect(await getItem<number>('key1')).toBe(1);
  });

  it('adds a new item', async () => {
    await setItem<string>('dummyKey1', 'value1');
    expect(await getItem<string>('dummyKey1')).toBe('value1');
  });

  it('removes a item', async () => {
    await setItem<string>('dummyKey2', 'value1');
    await removeItem('dummyKey2');
    expect(await getItem<string>('dummyKey2')).toBeUndefined();
  });

  it('clears all items', async () => {
    expect.assertions(3);

    await setItem<string>('c1', 'value1');
    await setItem<string>('c2', 'value1');
    await setItem<string>('c3', 'value1');

    await clearAll();

    ['c1', 'c2', 'c3'].forEach(async (key: string) => {
      expect(await getItem(key)).toBeUndefined();
    });
  });

  describe('Check the systemCache accepts singular values', () => {
    it('accepts null value', async () => {
      await setItem('key1', null);
      expect(await getItem('key1')).toBeNull();
    });

    it('accepts undefined value', async () => {
      await setItem('key1', undefined);
      expect(await getItem('key1')).toBeUndefined();
    });

    it('accepts 0 value', async () => {
      await setItem<number>('key1', 0);
      expect(await getItem<number>('key1')).toBe(0);
    });

    it('accepts empty object', async () => {
      await setItem<Record<string, unknown>>('key1', {});
      expect(await getItem<Record<string, unknown>>('key1')).toEqual({});
    });

    it('accepts empty array', async () => {
      await setItem<string[]>('key1', []);
      expect(await getItem<string[]>('key1')).toEqual([]);
    });

    it('accepts empty string', async () => {
      await setItem<string>('key', '');
      expect(await getItem<string>('key')).toBe('');
    });
  });
});
