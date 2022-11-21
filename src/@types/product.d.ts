// @types.product.ts

import type {IngredientType} from './ingredient';

export type ProductApiType = {
  id: string;
  img: string;
  title: string;
  description: string;
  ingredients?: string[];
};

export type ProductType = Pick<ProductApiType, 'id' | 'img' | 'title' | 'description'> & {
  ingredients?: IngredientType[];
  categoryId: CategoryIds;
};

export type ProductCategoryApiType = {
  category: string;
  id: CategoryIds;
  items: ProductApiType[];
};

export type ProductCategoryType = Pick<ProductCategoryApiType, 'id' | 'category'> & {
  items: ProductType[];
};

// New TYPES
export type MenuType =
  | {
      id: string;
      name: string;
      image: string;
      price: number;
      products: ProductType[];
    }
  | undefined;

export type CategoryIds =
  | 'burgers'
  | 'chicken'
  | 'complements'
  | 'desserts'
  | 'drinks'
  | 'breakfast'
  | 'coffee'
  | 'extra';
