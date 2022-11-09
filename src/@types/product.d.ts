// @types.product.ts

export type ProductType = {
  img: string;
  title: string;
  description: string;
  ingredients?: string[];
};

export type ProductCategoryType = {
  category: string;
  id: string;
  items: ProductType[];
};
