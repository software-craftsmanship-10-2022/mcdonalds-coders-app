import PRODUCTS from 'src/data/products';
import type {CategoryIds, ProductCategoryType} from '../../@types/product';

const getAllProductsFromApi = async (): Promise<ProductCategoryType[]> => {
  return Promise.resolve(PRODUCTS);
};

const getProductsByCategoryFromApi = async (
  categoryId: string | undefined,
): Promise<ProductCategoryType> => {
  return new Promise((resolve) => {
    const foundProductsByCategoryId = PRODUCTS.find(
      (productCategory) => productCategory.id === categoryId,
    );

    if (foundProductsByCategoryId) {
      resolve(foundProductsByCategoryId);
    } else {
      resolve({
        category: '',
        id: 'burgers',
        items: [],
      });
    }
  });
};

const getMultipleProductsByCategoryFromApi = async (
  categoryIds: CategoryIds[],
): Promise<ProductCategoryType[]> => {
  return new Promise((resolve) => {
    const foundProductsByCategoryIds = PRODUCTS.filter((productCategory) =>
      categoryIds.includes(productCategory.id),
    );

    resolve(foundProductsByCategoryIds);
  });
};

export {getAllProductsFromApi, getMultipleProductsByCategoryFromApi, getProductsByCategoryFromApi};
