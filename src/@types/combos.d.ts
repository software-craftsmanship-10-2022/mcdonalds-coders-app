import type {ProductType} from './product';

export type ComboApiType = {
  id: string;
  title: string;
  img: string;
  price: number;
  principalId: string;
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
  principalId: string;
};

export type ComboCategoryType = {
  id: string;
  category: string;
  items: ComboType[];
};

export type ComboDetailType = {
  id: string;
  title: string;
  img: string;
  price: number;
  mainProduct: ProductType;
};
