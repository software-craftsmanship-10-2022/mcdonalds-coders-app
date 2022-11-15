import type {CategoryIds} from 'src/@types/product';
import PRODUCTS from 'src/data/products';
import {
  getAllProductsFromApi,
  getMultipleProductsByCategoryFromApi,
  getProductsByCategoryFromApi,
  transformCategoryApiListToCategoryList,
  transformCategoryApiToCategory,
} from './productsApi';

describe('Given productsApi', () => {
  test('when we call getAllProductsFromApi, then all products data is resolved', async () => {
    await expect(getAllProductsFromApi()).resolves.toEqual(
      transformCategoryApiListToCategoryList(PRODUCTS),
    );
  });

  test('when we call getProductsByCategoryFromApi with a category id, then filter products data is resolved', async () => {
    const categoryId = 'burgers';
    const foundProductsByCategoryId = getProductsByCategoryFromApi(categoryId);

    const mockedFoundProducts = PRODUCTS.find(
      (productCategory) => productCategory.id === categoryId,
    );

    if (mockedFoundProducts) {
      await expect(foundProductsByCategoryId).resolves.toEqual(
        transformCategoryApiToCategory(mockedFoundProducts),
      );
    }
  });

  test('when we call getMultipleProductsByCategoryFromApi with an array of categories id, then filter products data is resolved', async () => {
    const categoryIds: CategoryIds[] = ['burgers', 'drinks'];
    const foundProductsByCategoryId = getMultipleProductsByCategoryFromApi(categoryIds);

    const mockedFoundProducts = PRODUCTS.filter((productCategory) =>
      categoryIds.includes(productCategory.id),
    ).map((category) => transformCategoryApiToCategory(category));

    await expect(foundProductsByCategoryId).resolves.toEqual(mockedFoundProducts);
  });
});
