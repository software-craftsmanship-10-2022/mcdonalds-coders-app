import type {ProductType} from './product';

export type ComboApiType = {
  id: string;
  title: string;
  img: string;
  price: number;
  mainProductId: string;
};

export type ComboCategoryApiType = {
  id: string;
  category: string;
  items: ComboApiType[];
};

export type ComboType = {
  id: string;
  title: string;
  img: string;
  price: number;
  mainProduct: ProductType;
};

export type ComboCategoryType = {
  id: string;
  category: string;
  items: ComboType[];
};
