import {useState} from 'react';
import type {ProductCategoryType} from '../@types/product';
import {getAllProductsFromApi, getProductsByCategoryFromApi} from '../api/products/productsApi';
import {getItem, setItem} from './cacheSystem';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductCategoryType>({
    category: '',
    id: '',
    items: [],
  });

  const getAllProducts = (): void => {
    getItem<ProductCategoryType[]>('products')
      .then((productsFromCache) => {
        if (productsFromCache) {
          setProducts(productsFromCache);
        } else {
          getAllProductsFromApi()
            .then((productsFromApi) => {
              setProducts(productsFromApi);
              setItem('products', productsFromApi).catch((error) => {
                console.error(error);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
