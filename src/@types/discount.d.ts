export type Discounts = Categories[];

export type Categories = {
  category: string;
  id: string;
  items: DiscountItem[];
};
export type DiscountItem = {
  id: string;
  title: string;
  img: string;
  price: number;
};
