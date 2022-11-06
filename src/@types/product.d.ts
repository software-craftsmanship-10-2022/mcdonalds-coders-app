// @types.product.ts

export type MenuType = {
  name: string;
  img: string;
  price: number;
  products: ProductType[];
};

export type ProductType = {
  img: string;
  title: string;
  description: string;
};

export type ProductCategoryType = {
  category: string;
  id: string;
  items: ProductType[];
};
