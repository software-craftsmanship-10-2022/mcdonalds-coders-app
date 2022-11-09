import PRODUCTS from 'src/data/products';
import {getAllProductsFromApi, getProductsByCategoryFromApi} from './productsApi';

describe('Given productsApi', () => {
  test('when we call getAllProductsFromApi, then all products data is resolved', async () => {
    await expect(getAllProductsFromApi()).resolves.toEqual(PRODUCTS);
  });

  test('when we call getProductsByCategoryFromApi with a category id, then filter products data is resolved', async () => {
    const categoryId = 'burgers';
    const foundProductsByCategoryId = getProductsByCategoryFromApi(categoryId);

    const mockedFoundProducts = PRODUCTS.find(
      (productCategory) => productCategory.id === categoryId,
    );

    await expect(foundProductsByCategoryId).resolves.toEqual(mockedFoundProducts);
  });
});
