import type {MenuType, ProductType} from 'src/@types/product';
import {MenuBuilder} from './builder';

const menus: Record<string, MenuType> = {
  kj7Stiwpn5: {
    id: 'kj7Stiwpn5',
    image: 'McCOMBOBIGMACGrande.png',
    name: 'McCombo BIG MAC Grande',
    price: 990,
    mainProduct: {
      categoryId: 'burgers',
      description: '',
      id: '',
      img: '',
      ingredients: [],
      title: '',
    },
    products: [],
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  '4IkmjbhAKy': {
    id: '4IkmjbhAKy',
    image: 'McCOMBOBIGMACMediano.png',
    name: 'McCombo BIG MAC Mediano',
    price: 870,
    mainProduct: {
      categoryId: 'burgers',
      description: '',
      id: '',
      img: '',
      ingredients: [],
      title: '',
    },
    products: [],
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
    id: 'coca-cola-zero-grande',
    img: 'Bebida.png',
    title: 'Coca Cola Zero Grande',
    description:
      'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan ' +
      'gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o ' +
      'grande.',
    categoryId: 'drinks',
  },
};

const complements: Record<string, ProductType> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Papas-pequeñas': {
    categoryId: 'complements',
    id: 'Papas-pequeñas',
    img: 'Papas-pequeñas.png',
    title: 'Papas pequeñas',
    description:
      'Calientes, crujientes y deliciosas, tus aliadas perfectas para cualquier comida. ' +
      'Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última en ' +
      'su versión pequeña.',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Papas-Medianas': {
    categoryId: 'complements',
    id: 'Papas-Medianas',
    img: 'Papas-Medianas.png',
    title: 'Papas Medianas',
    description:
      'Nuestro sello. Las aliadas perfectas para cualquier comida. Disfrutá de nuestras papas ' +
      'mundialmente famosas, desde la primera hasta la última. Crujientes y deliciosas, ' +
      'no vas a parar hasta terminarlas todas.',
  },
};

const mainProducts: Record<string, ProductType> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  big_mac: {
    categoryId: 'burgers',
    description: 'La hamburguesa más famosa del mundo. Un sabor único.',
    id: 'big_mac',
    img: 'big_mac.png',
    ingredients: [
      {
        extraPrice: 0,
        id: 'pan-arriba',
        img: 'Pan+arriba.png',
        modifiable: false,
        title: 'Pan',
      },
      {extraPrice: 0, id: 'pan-abajo', img: 'Pan+abajo.png', modifiable: false, title: 'Pan'},
      {extraPrice: 0, id: 'carne', img: 'carne.png', modifiable: false, title: 'Carne'},
      {
        extraPrice: 0,
        id: 'salsa-bigmac',
        img: 'salsa-bic-mac.png',
        modifiable: true,
        title: 'Salsa Big Mac',
      },
    ],
    title: 'Big Mac',
  },
  mcnifica: {
    categoryId: 'burgers',
    id: 'mcnifica',
    img: 'mcnifica.png',
    title: 'McNífica',
    ingredients: [
      {
        extraPrice: 0,
        id: 'pan-arriba',
        img: 'Pan+arriba.png',
        modifiable: false,
        title: 'Pan',
      },
      {extraPrice: 0, id: 'pan-abajo', img: 'Pan+abajo.png', modifiable: false, title: 'Pan'},
      {extraPrice: 0, id: 'carne', img: 'carne.png', modifiable: false, title: 'Carne'},
      {
        extraPrice: 0,
        id: 'salsa-bigmac',
        img: 'salsa-bic-mac.png',
        modifiable: true,
        title: 'Salsa Big Mac',
      },
    ],
    description:
      'En un mundo donde todos buscan lo nuevo, la McNífica viene a rectificar lo bueno de ser clásico.',
  },
};

describe('[MenuBuilder]', () => {
  describe('Test `MenuBuilder.constructor`', () => {
    it('creates a empty instance menu', () => {
      const menuBuilder = new MenuBuilder();

      expect(menuBuilder).toBeInstanceOf(MenuBuilder);
      expect(menuBuilder.getMenu()).toEqual({
        id: '',
        image: '',
        name: '',
        price: 0,
        mainProduct: {
          categoryId: 'burgers',
          description: '',
          id: '',
          img: '',
          ingredients: [],
          title: '',
        },
        products: [],
      });
    });
  });

  describe('Test `MenuBuilder.withMainMenu` method', () => {
    it('returns a MenuBuilder promise', () => {
      const menuBuilder = new MenuBuilder();
      const menuId = 'kj7Stiwpn5';

      expect(menuBuilder.withMainMenu(menus[menuId])).toBeInstanceOf(MenuBuilder);
    });

    it('should build a main menu', () => {
      const menuBuilder = new MenuBuilder();
      const menuId = 'kj7Stiwpn5';

      expect(menuBuilder.withMainMenu(menus[menuId]).getMenu()).toEqual(menus[menuId]);
    });

    it('checks the main menu is replaced', () => {
      const menuBuilder = new MenuBuilder();
      const menuId1 = 'kj7Stiwpn5';
      const menuId2 = '4IkmjbhAKy';

      menuBuilder.withMainMenu(menus[menuId1]);

      expect(menuBuilder.withMainMenu(menus[menuId2]).getMenu()).toEqual(menus[menuId2]);
    });
  });

  describe('Test `MenuBuilder.withMainProduct` function', () => {
    it('adds the main product in the menu type', () => {
      const menuId = 'kj7Stiwpn5';
      const mainProductId = 'big_mac';
      const menu = {...menus[menuId], mainProduct: mainProducts[mainProductId]};
      const menuBuilder = new MenuBuilder();

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withMainProduct(mainProducts[mainProductId]);

      expect(menuBuilder.getMenu()).toEqual(menu);
    });

    it('replaces the new main product by the current main product in the menu', () => {
      const menuId = 'kj7Stiwpn5';
      const mainProductId1 = 'big_mac';
      const mainProductId2 = 'mcnifica';
      const menu = {...menus[menuId], mainProduct: mainProducts[mainProductId2]};
      const menuBuilder = new MenuBuilder();

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withMainProduct(mainProducts[mainProductId1]);
      menuBuilder.withMainProduct(mainProducts[mainProductId2]);

      expect(menuBuilder.getMenu()).toEqual(menu);
    });
  });

  describe('Test `MenuBuilder.withDrink` function', () => {
    it('given the menu, add the drink to the menuBuilder', () => {
      const menuId = 'kj7Stiwpn5';
      const drinkdId = 'fanta-chica';
      const menuBuilder = new MenuBuilder();

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withDrink(drinks[drinkdId]);

      expect(
        menuBuilder.getMenu().products.find((product) => product.categoryId === 'drinks')?.id,
      ).toBe(drinkdId);
    });

    it('replaces the new drink by the current drink in the menu', () => {
      const menuId = 'kj7Stiwpn5';
      const drinkdId1 = 'fanta-chica';
      const drinkdId2 = 'coca-cola-zero-grande';
      const menuBuilder = new MenuBuilder();

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withDrink(drinks[drinkdId1]);
      menuBuilder.withDrink(drinks[drinkdId2]);

      expect(
        menuBuilder.getMenu().products.find((product) => product.categoryId === 'drinks')?.id,
      ).toBe(drinkdId1);
    });
  });

  describe('Test `MenuBuilder.withMainComplement` function', () => {
    it('adds the main complement in the product list', () => {
      const menuId = 'kj7Stiwpn5';
      const complementId = 'Papas-pequeñas';
      const menu = {...menus[menuId], products: [...menus[menuId]!.products]};
      const menuBuilder = new MenuBuilder();

      menu.products.push(complements[complementId]);

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withMainComplement(complements[complementId]);

      expect(menuBuilder.getMenu()).toEqual(menu);
    });

    it('replaces the new complement by the current complement in the menu', () => {
      const menuId = 'kj7Stiwpn5';
      const complementId1 = 'Papas-pequeñas';
      const complementId2 = 'Papas-Medianas';
      const menu = {...menus[menuId], products: [...menus[menuId]!.products]};
      const menuBuilder = new MenuBuilder();

      menu.products.push(complements[complementId2]);

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withMainComplement(complements[complementId1]);
      menuBuilder.withMainComplement(complements[complementId2]);

      expect(menuBuilder.getMenu()).toEqual(menu);
    });
  });

  describe('Test `MenuBuilder.withExtra` function', () => {
    it('adds the extra in the product list', () => {
      const menuId = 'kj7Stiwpn5';
      const extraId = 'Papas-pequeñas';
      const menu = {...menus[menuId], products: [...menus[menuId]!.products]};
      const menuBuilder = new MenuBuilder();

      menu.products.push(complements[extraId]);

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withExtra(complements[extraId]);

      const extraAdded = {...complements[extraId]};
      extraAdded.categoryId = 'extra';

      expect(menuBuilder.getMenu()!.products).toEqual(
        expect.arrayContaining([expect.objectContaining({id: extraId})]),
      );
    });

    it('replaces the new complement by the current complement in the menu', () => {
      const menuId = 'kj7Stiwpn5';
      const extraId1 = 'Papas-pequeñas';
      const extraId2 = 'Papas-Medianas';
      const menu = {...menus[menuId], products: [...menus[menuId]!.products]};
      const menuBuilder = new MenuBuilder();

      menu.products.push(complements[extraId2]);

      menuBuilder.withMainMenu(menus[menuId]);
      menuBuilder.withExtra(complements[extraId1]);
      menuBuilder.withExtra(complements[extraId2]);

      const extraAdded = {...complements[extraId2]};
      extraAdded.categoryId = 'extra';

      expect(menuBuilder.getMenu()!.products).toEqual(
        expect.arrayContaining([expect.objectContaining({id: extraId2})]),
      );
    });
  });
});
