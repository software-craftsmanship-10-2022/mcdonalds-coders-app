import PRODUCTS from 'src/data/products';
import type {ProductCategoryType} from '~types/product';

const getAllProducts = async (): Promise<ProductCategoryType[]> => {
  return Promise.resolve(PRODUCTS);
};

export {getAllProducts};
