import {useEffect, useState} from 'react';
import type {ProductCategoryType} from '~types/product';
import {findProductsByCategoryId, getAllProducts} from '../api/products/productsApi';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCategoryType[]>([]);

  useEffect(() => {
    const fetchAllProducts = async (): Promise<void> => {
      const response = await getAllProducts();
      setProducts(response);
    };

    fetchAllProducts().catch((error) => {
      console.error(error);
    });
  }, [products]);

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

  useEffect(() => {
    const fetchProductsByCategory = async (categoryId: string | undefined): Promise<void> => {
      const response = await findProductsByCategoryId(categoryId);
      setProductsByCategory(response);
    };

    fetchProductsByCategory(categoryId).catch((error) => {
      console.error(error);
    });
  }, [productsByCategory]);

  return {
    productsByCategory,
  };
};
