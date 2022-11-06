// GIVEN getAllProducts function WHEN you call the function THEN
// must be a function
// Must return a promise
// Must return an array of products after the promise is resolved

import PRODUCTS from 'src/data/products';
import {getAllProducts} from './productsApi';

describe('Given productsApi', () => {
  test('when we call getAllProducts, then all products data is resolved', async () => {
    await expect(getAllProducts()).resolves.toEqual(PRODUCTS);
  });
});
