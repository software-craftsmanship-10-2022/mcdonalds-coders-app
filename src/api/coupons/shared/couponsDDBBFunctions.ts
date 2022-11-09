import type {CouponType} from 'src/@types/coupon';
import type {Categories, DiscountItem, Discounts} from 'src/@types/discount';
import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';

export function retrieveCouponFromFakeDDBB(id: string): DiscountItem | undefined {
  const {getStorageItem} = useLocalStorage();
  const discounts: Discounts = getStorageItem(STORAGE.discounts) as Discounts;
  if (!discounts) {
    throw new Error('No discounts available');
  }

  let coupon: DiscountItem | undefined;
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

export const saveInDDBB = (key: string, element: CouponType[] | Discounts): void => {
  localStorage.setItem(key, JSON.stringify(element));
};

export const getFromDDBB = (key: string): any => {
  const {getStorageItem} = useLocalStorage();
  const value: unknown = getStorageItem(key);
  // Return value if exists & is valid
  if (value && value !== 'undefined') {
    return value;
  }

  return null;
};
