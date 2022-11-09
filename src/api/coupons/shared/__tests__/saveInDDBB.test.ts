import type {Discounts} from 'src/@types/discount';
import {STORAGE} from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {MOCK_DISCOUNTS} from '../../operations/mocks/mocks';
import {saveInDDBB} from '../couponsDDBBFunctions';

describe('given an id', () => {
  const {getStorageItem} = useLocalStorage();

  afterEach(() => {
    localStorage.clear();
  });

  test('when discounts are not defined in localStorage then an error is thrown', () => {
    const [discount] = MOCK_DISCOUNTS;

    const expectedOutput = [
      {
        category: 'Para disfrutar en familia',
        id: 'burgers',
        items: [
          {
            id: '8XUu0dMqsP',
            title: '2 McCombos Cuarto de Libra',
            img: 'PROMOCIONE2McCombosMedianosCuartodeLibraconQueso.png',
            price: 1250,
          },
          {
            id: 'GLq1PiKg8v',
            title: '2 McCombos Cuarto de Libra Mediano',
            img: 'Promocion20.png',
            price: 1590,
          },
          {
            id: 'zaNOARwp7w',
            title: 'Menu Ensalada Deli Pollo + Bebida',
            img: 'Promocion18.png',
            price: 599,
          },
          {
            id: 'iaIyirjSbb',
            title: '2 McCombos Triple Queso Medianos',
            img: 'Promocion19.png',
            price: 1590,
          },
        ],
      },
    ];

    const prevLocalStorageState = getStorageItem(STORAGE.discounts) as Discounts;
    expect(prevLocalStorageState).toBeNull();

    saveInDDBB(STORAGE.discounts, [discount]);

    const postLocalStorageState = getStorageItem(STORAGE.discounts) as Discounts;
    expect(postLocalStorageState).toEqual(expectedOutput);
  });
});
