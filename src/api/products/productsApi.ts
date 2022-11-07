import PRODUCTS from 'src/data/products';
import type {ProductCategoryType} from '~types/product';

const getAllProducts = async (): Promise<ProductCategoryType[]> => {
  return Promise.resolve(PRODUCTS);
};

const findProductsByCategoryId = async (
  categoryId: string,
): Promise<ProductCategoryType | undefined> => {
  return Promise.resolve(PRODUCTS.find((productCategory) => productCategory.id === categoryId));
};

export {findProductsByCategoryId, getAllProducts};
