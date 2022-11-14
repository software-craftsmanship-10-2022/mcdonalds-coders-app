import COMBOS from 'src/data/combos';
import {getAllCombosFromApi, getComboDetailByIdFromApi} from './combosApi';

describe('Given combosApi', () => {
  test('getAllCombos should be a function', () => {
    expect(getAllCombosFromApi).toBeInstanceOf(Function);
  });

  test('getAllCombos should return a Combos data when is resolved', async () => {
    await expect(getAllCombosFromApi()).resolves.toEqual(COMBOS);
  });

  test('getCombosDetailById should be a function', () => {
    expect(getComboDetailByIdFromApi).toBeInstanceOf(Function);
  });
});
