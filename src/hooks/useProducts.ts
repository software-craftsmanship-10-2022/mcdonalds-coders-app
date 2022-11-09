import {useState} from 'react';
import type {ProductCategoryType} from '~types/product';
import {findProductsByCategoryId, getAllProducts} from '../api/products/productsApi';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);

  const fetchAllProducts = async (): Promise<void> => {
    const response = await getAllProducts();
    setProducts(response);
  };

  fetchAllProducts().catch((error) => {
    console.error(error);
  });

  return {
    products,
  };
};

export const useProductsByCategory = (categoryId: string | undefined) => {
  const [productsByCategory, setProductsByCategory] = useState<ProductCategoryType>({
    category: '',
    id: '',
    items: [],
  });

  const fetchProductsByCategory = async (categoryId: string | undefined): Promise<void> => {
    const response = await findProductsByCategoryId(categoryId);
    setProductsByCategory(response);
  };

  fetchProductsByCategory(categoryId).catch((error) => {
    console.error(error);
  });

  return {
    productsByCategory,
  };
};
