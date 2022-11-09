import {useState} from 'react';
import type {ProductCategoryType} from '~types/product';
import {getAllProductsFromApi, getProductsByCategoryFromApi} from '../api/products/productsApi';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductCategoryType>({
    category: '',
    id: '',
    items: [],
  });

  const getAllProducts = (): void => {
    getAllProductsFromApi()
      .then((response) => {
        setProducts(response);
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
