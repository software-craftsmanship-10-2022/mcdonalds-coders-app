import {getAllCombosFromApi, getComboDetailByIdFromApi} from './combosApi';

describe('Given combosApi', () => {
  test('getAllCombos should be a function', () => {
    expect(getAllCombosFromApi).toBeInstanceOf(Function);
  });

  test('getCombosDetailById should be a function', () => {
    expect(getComboDetailByIdFromApi).toBeInstanceOf(Function);
  });
});
