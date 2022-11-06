// GIVEN getAllProducts function WHEN you call the function THEN
// must be a function
// Must return a promise
// Must return an array of products after the promise is resolved

import PRODUCTS from 'src/data/products';
import {getAllProducts} from './productsApi';

describe('GIVEN getAllProducts function WHEN you call the function THEN', () => {
  test('must be a function', () => {
    expect(typeof getAllProducts).toBe('function');
  });

  test('must return all products data after the promise is resolved', async () => {
    await expect(getAllProducts()).resolves.toEqual(PRODUCTS);
  });

  test('must resolve the promise in 100ms', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    await getAllProducts();
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });
});
