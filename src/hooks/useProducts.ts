import type {ProductCategoryType} from '~types/product';
import {getAllProducts} from '../api/products/productsApi';

export const useProducts = () => {
  /*   Let products: any = useLocalStorage().getStorageItem('products'); */
  const products = getAllProducts();

  /*   If (!products) {
    products = getAllProducts();
    useLocalStorage().setStorageItem('products', products);
  } */

  const findProductsByCategory = (category: string) => {
    if (typeof category !== 'string') {
      throw new Error('The category must be a string');
    }

    const foundCategory: ProductCategoryType = products.find(
      (productsCategory: ProductCategoryType) => productsCategory.id === category,
    );

    return foundCategory;
  };

  return {
    products,
    findProductsByCategory,
  };
};
