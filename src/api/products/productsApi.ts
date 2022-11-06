import PRODUCTS from 'src/data/products';
import type {ProductCategoryType} from '~types/product';

const getAllProducts = async (): Promise<ProductCategoryType[]> => {
  const promise: Promise<ProductCategoryType[]> = new Promise<ProductCategoryType[]>(
    (resolve, reject) => {
      resolve(PRODUCTS);
    },
  );

  return promise;
};

export {getAllProducts};
