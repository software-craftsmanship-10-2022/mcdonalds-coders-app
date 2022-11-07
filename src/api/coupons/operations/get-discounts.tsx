import type {Discounts} from 'src/@types/discount';
import {STORAGE} from 'src/config';
import {saveInDDBB} from '../shared/couponsDDBBFunctions';

async function getDiscounts(): Promise<any> {
  return fetch('/data/discounts.json')
    .then(async (response) => {
      return response.json();
    })
    .then((discounts: Discounts) => {
      saveInDDBB(STORAGE.discounts, discounts);
      return discounts;
    })
    .catch((error: Error) => {
      throw new Error('API failure');
    });
}

export default getDiscounts;
