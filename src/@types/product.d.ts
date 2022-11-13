// @types.product.ts

export type ProductType = {
  id: string;
  img: string;
  title: string;
  description: string;
};

export type ProductCategoryType = {
  category: string;
  id: CategoryIds;
  items: ProductType[];
};

// New TYPES
export type MenuType = {
  id: string;
  name: string;
  image: string;
  price: number;
  products: ProductType[];
};

export type CategoryIds =
  | 'burgers'
  | 'chicken'
  | 'complements'
  | 'desserts'
  | 'drinks'
  | 'breakfast'
  | 'coffee';
