import {
  complements as COMPLEMENTS,
  drinks as DRINKS,
  mainProducts as MAIN_PRODUCTS,
  menus as MENUS,
} from 'src/data/menuMocks';
import {MenuBuilder} from './builder';

fdescribe('Given a menu builder', () => {
  // It('should an empty menu', () => {
  //   const menuBuilder = new MenuBuilder();

  //   expect(menuBuilder.getMenu()).toEqual({
  //     id: '',
  //     image: '',
  //     name: '',
  //     price: 0,
  //     mainProduct: {
  //       categoryId: 'burgers',
  //       description: '',
  //       id: '',
  //       img: '',
  //       ingredients: [],
  //       title: '',
  //     },
  //     products: [],
  //   });
  // });

  it('should build menu information ', () => {
    const menuId = 'kj7Stiwpn5';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);

    const finalMenu = menuBuilder.getMenu();
    expect(finalMenu.id).toEqual(menuId);
  });

  it('should replace menu information', () => {
    const menuId = 'kj7Stiwpn5';
    const menuId2 = '4IkmjbhAKy';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withMainMenu(MENUS[menuId2]);

    const finalMenu = menuBuilder.getMenu();
    expect(finalMenu.id).toEqual(menuId2);
  });

  it('should add main product', () => {
    const menuId = 'kj7Stiwpn5';
    const mainProductId = 'big_mac';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withMainProduct(MAIN_PRODUCTS[mainProductId]);

    const finalMenu = menuBuilder.getMenu();
    expect(finalMenu.mainProduct.id).toEqual(mainProductId);
  });

  it('should replace main product', () => {
    const menuId = 'kj7Stiwpn5';
    const mainProductId = 'big_mac';
    const mainProductId2 = 'mcnifica';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withMainProduct(MAIN_PRODUCTS[mainProductId]);
    menuBuilder.withMainProduct(MAIN_PRODUCTS[mainProductId2]);

    const finalMenu = menuBuilder.getMenu();
    expect(finalMenu.mainProduct.id).toEqual(mainProductId2);
  });

  it('should add a drink', () => {
    const menuId = 'kj7Stiwpn5';
    const drinkdId = 'fanta-chica';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withDrink(DRINKS[drinkdId]);

    const finalMenu = menuBuilder.getMenu();
    const menuHasDrink = finalMenu.products.find((product) => product.categoryId === 'drinks');

    expect(menuHasDrink?.id).toBe(drinkdId);
  });

  it('should replace a drink', () => {
    const menuId = 'kj7Stiwpn5';
    const drinkdId = 'fanta-chica';
    const drinkId2 = 'coca-cola-zero-grande';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withDrink(DRINKS[drinkdId]);
    menuBuilder.withDrink(DRINKS[drinkId2]);

    const finalMenu = menuBuilder.getMenu();
    const menuHasDrink = finalMenu.products.find((product) => product.categoryId === 'drinks');

    expect(menuHasDrink?.id).toBe(drinkId2);
  });

  it('should add a complement', () => {
    const menuId = 'kj7Stiwpn5';
    const complementId = 'Papas-pequeñas';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withComplement(COMPLEMENTS[complementId]);

    const finalMenu = menuBuilder.getMenu();
    const menuHasComplement = finalMenu.products.find(
      (product) => product.categoryId === 'complements',
    );

    expect(menuHasComplement?.id).toBe(complementId);
  });

  it('should replace a complement', () => {
    const menuId = 'kj7Stiwpn5';
    const complementId = 'Papas-pequeñas';
    const complementId2 = 'Papas-Medianas';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withComplement(COMPLEMENTS[complementId]);
    menuBuilder.withComplement(COMPLEMENTS[complementId2]);

    const finalMenu = menuBuilder.getMenu();
    const menuHasComplement = finalMenu.products.find(
      (product) => product.categoryId === 'complements',
    );

    expect(menuHasComplement?.id).toBe(complementId2);
  });

  it('should add an extra', () => {
    const menuId = 'kj7Stiwpn5';
    const extraId = 'Papas-pequeñas';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withExtra(COMPLEMENTS[extraId]);

    const finalMenu = menuBuilder.getMenu();
    const menuHasExtra = finalMenu.products.find((product) => product.categoryId === 'extra');

    expect(menuHasExtra?.id).toBe(extraId);
  });

  it('should replace an extra', () => {
    const menuId = 'kj7Stiwpn5';
    const extraId = 'Patatas-pequeñas';
    const extraId2 = 'Patatas-Medianas';

    const menuBuilder = new MenuBuilder();
    menuBuilder.withMainMenu(MENUS[menuId]);
    menuBuilder.withExtra(COMPLEMENTS[extraId]);
    menuBuilder.withExtra(COMPLEMENTS[extraId2]);

    const finalMenu = menuBuilder.getMenu();
    const menuHasExtra = finalMenu.products.find((product) => product.categoryId === 'extra');

    expect(menuHasExtra?.id).toBe(extraId2);
  });

  it('should throw an error when trying to add a drink without menu info', () => {
    const drinkdId = 'fanta-chica';
    const menuBuilder = new MenuBuilder();

    expect(() => {
      menuBuilder.withDrink(DRINKS[drinkdId]);
    }).toThrow(Error);
  });

  it('should throw an error when trying to add a complement without menu info', () => {
    const complementId = 'Papas-pequeñas';
    const menuBuilder = new MenuBuilder();

    expect(() => {
      menuBuilder.withDrink(COMPLEMENTS[complementId]);
    }).toThrow(Error);
  });

  it('should throw an error when trying to add an extra without menu info', () => {
    const extraId = 'Patatas-pequeñas';
    const menuBuilder = new MenuBuilder();

    expect(() => {
      menuBuilder.withExtra(COMPLEMENTS[extraId]);
    }).toThrow(Error);
  });
});
