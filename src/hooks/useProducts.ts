import {useState} from 'react';
import type {ProductCategoryType} from '../@types/product';
import {getAllProductsFromApi, getProductsByCategoryFromApi} from '../api/products/productsApi';
import {getSessionStorageItem, setSessionStorageItem} from './useSessionStorage';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductCategoryType>({
    category: '',
    id: '',
    items: [],
  });

  const getAllProducts = (): void => {
    const productsFromCache = getSessionStorageItem<ProductCategoryType[] | undefined>('products');

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
    const productsByCategoryFromCache = getSessionStorageItem<ProductCategoryType | undefined>(
      categoryId,
    );

    if (productsByCategoryFromCache) {
      setCategoryProducts(productsByCategoryFromCache);
    }

    if (!productsByCategoryFromCache) {
      getProductsByCategoryFromApi(categoryId)
        .then((productsByCategoryFromApi) => {
          setCategoryProducts(productsByCategoryFromApi);
          setSessionStorageItem(categoryId, productsByCategoryFromApi);
        })
        .catch(console.error);
    }
  };

  return {products, categoryProducts, getAllProducts, getProductsByCategory};
};
