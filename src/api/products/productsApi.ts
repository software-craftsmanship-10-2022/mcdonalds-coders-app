import PRODUCTS from 'src/data/products';
import type {ProductCategoryType} from '~types/product';

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
      resolve({category: '', id: '', items: []});
    }
  });
};

export {getProductsByCategoryFromApi, getAllProductsFromApi};
