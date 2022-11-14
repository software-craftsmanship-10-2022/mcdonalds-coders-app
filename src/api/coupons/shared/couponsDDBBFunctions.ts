import type {Categories, DiscountItem, Discounts} from 'src/@types/discount';
import {STORAGE} from 'src/config';

export function retrieveCouponFromFakeDDBB(id: string): DiscountItem {
  const discounts: Discounts | undefined = getFromDDBB<Discounts>(STORAGE.discounts);
  let coupon: DiscountItem | undefined;
  if (!discounts) {
    throw Error('No discounts available');
  }

  discounts.forEach((category: Categories) => {
    category.items.forEach((item: DiscountItem) => {
      if (item.id === id) {
        coupon = item;
      }
    });
  });
  if (!coupon) {
    throw Error('Item id does not match');
  }

  return coupon;
}

export const saveInDDBB = <T>(key: string, element: T): void => {
  localStorage.setItem(key, JSON.stringify(element));
};

export const getFromDDBB = <T>(key: string): T | undefined => {
  const value = localStorage.getItem(key);
  let obj: T;
  if (!value) {
    return undefined;
  }

  try {
    obj = JSON.parse(value) as T;
    return obj;
  } catch {
    return undefined;
  }
};
