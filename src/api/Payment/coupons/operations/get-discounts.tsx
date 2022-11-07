import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import type {Discounts} from '~types/discount';

async function getDiscounts(): Promise<any> {
  return fetch('/data/discounts.json')
    .then(async (response) => {
      return response.json();
    })
    .then((discounts: Discounts) => {
      const {setStorageItem} = useLocalStorage();
      setStorageItem(STORAGE.discounts, discounts);
      return discounts;
    })
    .catch((error: Error) => {
      throw new Error('API failure');
    });
}

export default getDiscounts;
