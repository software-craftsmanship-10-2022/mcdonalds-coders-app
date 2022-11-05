
// GIVEN getAllProducts function WHEN you call the function THEN 
 // must be a function
 // Must return a promise
 // Must return an array of products after the promise is resolved

import PRODUCTS from "src/data/products";
import { getAllProducts } from "./productsApi";

describe('GIVEN getAllProducts function WHEN you call the function THEN', ()=>{
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test('must be a function', ()=>{
    expect(typeof getAllProducts).toBe("function");
  });
  
  test('Must return all products data after the promise is resolved', async ()=>{
    await expect(getAllProducts()).resolves.toEqual(PRODUCTS);
  });
  
  test('Must resolve the promise in 100ms', async ()=>{
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    getAllProducts()
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });
});
