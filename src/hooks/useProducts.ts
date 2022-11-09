import {useState} from 'react';
import type {ProductCategoryType} from '../@types/product';
import {getAllProductsFromApi, getProductsByCategoryFromApi} from '../api/products/productsApi';
import {useSessionStorage} from './useSessionStorage';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductCategoryType>({
    category: '',
    id: '',
    items: [],
  });

  const {getSessionStorageItem, setSessionStorageItem} = useSessionStorage();

  const productsFromCache = getSessionStorageItem<ProductCategoryType[] | undefined>('products');

  const getAllProducts = (): void => {
    if (productsFromCache) {
      setProducts(productsFromCache);
    }

    if (!productsFromCache) {
      getAllProductsFromApi()
        .then((productsFromApi) => {
          setProducts(productsFromApi);
          setSessionStorageItem('products', productsFromApi);
        })
        .catch(console.error);
    }
  };

  const getProductsByCategory = (categoryId: string): void => {
    getProductsByCategoryFromApi(categoryId)
      .then((response) => {
        setCategoryProducts(response);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return {products, categoryProducts, getAllProducts, getProductsByCategory};
};
