// @types.product.ts

export type ProductType = {
  id: string;
  img: string;
  title: string;
  description: string;
  ingredients?: string[];
};

export type ProductCategoryType = {
  category: string;
  id: CategoryIds;
  items: ProductType[];
};

export type CategoryIds =
  | 'burgers'
  | 'chicken'
  | 'complements'
  | 'desserts'
  | 'drinks'
  | 'breakfast'
  | 'coffee';
