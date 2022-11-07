import PRODUCTS from 'src/data/products';
import {findProductsByCategoryId, getAllProducts} from './productsApi';

describe('Given productsApi', () => {
  test('when we call getAllProducts, then all products data is resolved', async () => {
    await expect(getAllProducts()).resolves.toEqual(PRODUCTS);
  });

  test('when we call findProductsByCategoryId with a category id, then filter products data is resolved', async () => {
    const categoryId = 'burgers';
    const foundProductsByCategoryId = findProductsByCategoryId(categoryId);

    const mockedFoundProducts = PRODUCTS.find(
      (productCategory) => productCategory.id === categoryId,
    );

    await expect(foundProductsByCategoryId).resolves.toEqual(mockedFoundProducts);
  });
});
