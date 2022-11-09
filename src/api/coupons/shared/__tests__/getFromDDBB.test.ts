import type {Discounts} from 'src/@types/discount';
import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {MOCK_DISCOUNTS} from '../../operations/mocks/mocks';
import {getFromDDBB} from '../couponsDDBBFunctions';

describe('given a key', () => {
  const {setStorageItem} = useLocalStorage();

  afterEach(() => {
    localStorage.clear();
  });

  test('when key is not defined in localStorage then undefined is returned', () => {
    const output = getFromDDBB(STORAGE.discounts) as Discounts;
    expect(output).toBeNull();
  });

  test('when key is defined in localStorage then expected output is returned', () => {
    const expectedOutput = [...MOCK_DISCOUNTS];
    setStorageItem(STORAGE.discounts, MOCK_DISCOUNTS);

    const output = getFromDDBB(STORAGE.discounts) as Discounts;
    expect(output).toEqual(expectedOutput);
  });
});
