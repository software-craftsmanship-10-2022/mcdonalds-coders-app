import PRODUCTS from 'src/data/products';
import type {ProductCategoryType} from '~types/product';

const getAllProducts = async (): Promise<ProductCategoryType[]> => {
  return Promise.resolve(PRODUCTS);
};

const findProductsByCategoryId = async (
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

export {findProductsByCategoryId, getAllProducts};
