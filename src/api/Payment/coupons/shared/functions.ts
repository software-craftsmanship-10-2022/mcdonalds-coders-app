import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import useRandom from 'src/hooks/useRandom';
import type {Categories, DiscountItem, Discounts} from '~types/discount';

export function getDate() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
}

export function getCode() {
  const randomString = useRandom(9);
  return randomString.match(/.{1,3}/g)!.join('-');
}

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
