import {useEffect, useState} from 'react';
import type {ProductCategoryType} from '~types/product';
import {getAllProducts} from '../api/products/productsApi';

export const useProducts = () => {
  // Const {getStorageItem, setStorageItem} = useLocalStorage();
  const [products, setProducts] = useState<ProductCategoryType[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products]);

  const findProductsByCategory = (category: string) => {
    if (typeof category !== 'string') {
      throw new Error('The category must be a string');
    }

    return products.find((productCategory) => productCategory.id === category);
  };

  return {
    products,
    findProductsByCategory,
  };
};
