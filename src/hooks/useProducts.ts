import {useState} from 'react';
import type {CategoryIds, ProductCategoryType} from '../@types/product';
import {
  getAllProductsFromApi,
  getMultipleProductsByCategoryFromApi,
  getProductsByCategoryFromApi,
} from '../api/products/productsApi';
import {getSessionStorageItem, setSessionStorageItem} from './useSessionStorage';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductCategoryType>({
    category: '',
    id: 'burgers',
    items: [],
  } as ProductCategoryType);
  const [multipleProductsByCategory, setMultipleProductsByCategory] = useState<
    ProductCategoryType[]
  >([]);

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

  const getMultipleProductsByCategory = (categoryIds: CategoryIds[]): void => {
    getMultipleProductsByCategoryFromApi(categoryIds)
      .then((multipleProductsByCategory) => {
        setMultipleProductsByCategory(multipleProductsByCategory);
      })
      .catch(console.error);
  };

  return {
    products,
    categoryProducts,
    multipleProductsByCategory,
    getAllProducts,
    getMultipleProductsByCategory,
    getProductsByCategory,
  };
};
