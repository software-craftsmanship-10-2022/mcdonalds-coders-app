/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {Discounts} from 'src/@types/discount';
import {getErrorMessage} from 'src/api/errorHandling/errorHandler';
import {STORAGE} from 'src/config';
import DISCOUNTS from 'src/data/discounts';
import useLocalStorage from 'src/hooks/useLocalStorage';
import getDiscounts from '../get-discounts';

import {MOCK_DISCOUNTS} from '../mocks/mocks';
describe('given a coupons request', () => {
  globalThis.fetch = jest.fn(async () => {
    return Promise.resolve({
      json: () => MOCK_DISCOUNTS,
      ok: true,
      status: 200,
    });
  }) as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when promise is resolved then a list of coupons should be returned', async () => {
    const discounts: Discounts = await getDiscounts();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/data/discounts.json');
    expect(discounts).toBeInstanceOf(Array);
    expect(discounts).toEqual(DISCOUNTS);
    expect(discounts.length).toBeTruthy();
  });
  test('when request is successful it should save the response in local Storage', async () => {
    await getDiscounts();
    const {getStorageItem} = useLocalStorage();
    const localStorageDiscounts = getStorageItem(STORAGE.discounts);
    expect(localStorageDiscounts).toEqual(MOCK_DISCOUNTS);
  });
  test('when promise is rejected then expected info error', async () => {
    globalThis.fetch = jest.fn(async () => {
      return Promise.reject(new Error('API failure'));
    });
    try {
      const discounts: Discounts = await getDiscounts();
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error);
      expect(getErrorMessage(e)).toEqual('API failure');
    }
  });
});
