import type {MenuType, ProductType} from 'src/@types/product';
import {ERRORS, MenuBuilder} from './builder';

const menus: Record<string, MenuType> = {
  kj7Stiwpn5: {
    id: 'kj7Stiwpn5',
    image: 'McCOMBOBIGMACGrande.png',
    name: 'McCombo BIG MAC Grande',
    price: 990,
    products: [
      {
        categoryId: 'burgers',
        description: 'La hamburguesa más famosa del mundo. Un sabor único.',
        id: 'big_mac',
        img: 'big_mac.png',
        ingredients: [
          {
            extraPrice: 0,
            id: 'pan-arriba',
            img: 'Pan+arriba.png',
            modifaible: false,
            title: 'Pan',
          },
          {extraPrice: 0, id: 'pan-abajo', img: 'Pan+abajo.png', modifaible: false, title: 'Pan'},
          {extraPrice: 0, id: 'carne', img: 'carne.png', modifaible: false, title: 'Carne'},
          {
            extraPrice: 0,
            id: 'salsa-bigmac',
            img: 'salsa-bic-mac.png',
            modifaible: true,
            title: 'Salsa Big Mac',
          },
        ],
        title: 'Big Mac',
      },
    ],
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  '4IkmjbhAKy': {
    id: '4IkmjbhAKy',
    image: 'McCOMBOBIGMACMediano.png',
    name: 'McCombo BIG MAC Mediano',
    price: 870,
    products: [
      {
        categoryId: 'burgers',
        description: 'La hamburguesa más famosa del mundo. Un sabor único.',
        id: 'big_mac',
        img: 'big_mac.png',
        ingredients: [
          {extraPrice: 0, id: 'pan-arriba', img: 'Pan+arriba.png', modifaible: false, title: 'Pan'},
          {extraPrice: 0, id: 'pan-abajo', img: 'Pan+abajo.png', modifaible: false, title: 'Pan'},
          {extraPrice: 0, id: 'carne', img: 'carne.png', modifaible: false, title: 'Carne'},
          {
            extraPrice: 0,
            id: 'salsa-bigmac',
            img: 'salsa-bic-mac.png',
            modifaible: true,
            title: 'Salsa Big Mac',
          },
        ],
        title: 'Big Mac',
      },
    ],
  },
};

const drinks: Record<string, ProductType> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'fanta-chica': {
    id: 'fanta-chica',
    img: 'Bebida.png',
    title: 'Fanta Chica',
    description:
      'Burbujas contra el calor, contra la sed, contra el aburrimiento. ' +
      'Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, ' +
      'elegila en tamaño regular, mediano o grande.',
    ingredients: undefined,
    categoryId: 'drinks',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'coca-cola-zero-grande': {
    categoryId: 'drinks',
    id: 'coca-cola-zero-grande',
    img: 'Bebida.png',
    title: 'Coca Cola Zero Grande',
    description:
      'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan ' +
      'gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o ' +
      'grande.',
  },
};

describe('[MenuBuilder]', () => {
  describe('Test `MenuBuilder.constructor`', () => {
    it('creates a empty instance menu', () => {
      const menuBuilder = new MenuBuilder();

      expect(menuBuilder).toBeInstanceOf(MenuBuilder);
      expect(menuBuilder.getMenu()).toEqual({id: '', image: '', name: '', price: 0, products: []});
    });
  });

  describe('Test `MenuBuilder.withMainMenu` method', () => {
    it('returns a MenuBuilder promise', async () => {
      const menuBuilder = new MenuBuilder();
      const menuId = 'kj7Stiwpn5';
      expect(await menuBuilder.withMainMenu(menuId)).toBeInstanceOf(MenuBuilder);
    });

    it('should build a main menu', async () => {
      const menuBuilder = new MenuBuilder();
      const menuId = 'kj7Stiwpn5';

      expect((await menuBuilder.withMainMenu(menuId)).getMenu()).toEqual(menus[menuId]);
    });

    it('checks the main menu is replaced', async () => {
      const menuBuilder = new MenuBuilder();
      const menuId1 = 'kj7Stiwpn5';
      const menuId2 = '4IkmjbhAKy';

      await menuBuilder.withMainMenu(menuId1);

      expect((await menuBuilder.withMainMenu(menuId2)).getMenu()).toEqual(menus[menuId2]);
    });
  });

  describe('Test `MenuBuilder.withDrink` function', () => {
    it('throws an error if the main menu did not create before', async () => {
      expect.assertions(1);

      try {
        await new MenuBuilder().withDrink('fanta-chica');
      } catch (error) {
        expect(error).toEqual(new Error(ERRORS.mainMenuNoExist));
      }
    });

    it('returns a MenuBuilder promise', async () => {
      const menuId = 'kj7Stiwpn5';
      const menuBuilder = new MenuBuilder();
      await menuBuilder.withMainMenu(menuId);

      expect(await menuBuilder.withDrink('fanta-chica')).toBeInstanceOf(MenuBuilder);
    });

    it('adds the drink in the product list', async () => {
      const menuId = 'kj7Stiwpn5';
      const drinkdId = 'fanta-chica';
      const menu = {...menus[menuId], products: [...menus[menuId].products]};
      const menuBuilder = new MenuBuilder();

      menu.products.push(drinks[drinkdId]);

      await menuBuilder.withMainMenu(menuId);
      await menuBuilder.withDrink(drinkdId);

      expect(menuBuilder.getMenu()).toEqual(menu);
    });

    it('throws when the drink id is not exist', async () => {
      const menuId = 'kj7Stiwpn5';
      const drinkId = 'invalid-id';
      const menuBuilder = new MenuBuilder();

      expect.assertions(1);

      try {
        await menuBuilder.withMainMenu(menuId);
        await menuBuilder.withDrink(drinkId);
      } catch (error) {
        expect(error).toEqual(new Error(ERRORS.drinkIdNotfound(drinkId)));
      }
    });

    it('replaces the new drink by the current drink in the menu', async () => {
      const menuId = 'kj7Stiwpn5';
      const drinkdId1 = 'fanta-chica';
      const drinkdId2 = 'coca-cola-zero-grande';
      const menu = {...menus[menuId], products: [...menus[menuId].products]};
      const menuBuilder = new MenuBuilder();

      menu.products.push(drinks[drinkdId2]);

      await menuBuilder.withMainMenu(menuId);
      await menuBuilder.withDrink(drinkdId1);
      await menuBuilder.withDrink(drinkdId2);

      expect(menuBuilder.getMenu()).toEqual(menu);
    });
  });
});
