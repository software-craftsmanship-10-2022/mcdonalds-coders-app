import type {MenuType, ProductType} from 'src/@types/product.d';

export const ERRORS = {
  mainMenuNoExist: 'The main menu has not been added',
  drinkIdNotfound: (id: string) => `The drink '${id}' does not exist`,
  complementNotFound: (id: string) => `The complment '${id}' does not exist`,
};

export interface MenuBuilderInterface {
  withMainMenu(menu: MenuType): MenuBuilderInterface;
  withDrink(product: ProductType): MenuBuilderInterface;
  withMainComplement(product: ProductType): MenuBuilderInterface;
  withExtra(product: ProductType): MenuBuilderInterface;
  getMenu(): MenuType;
  reset(): void;
}

export class MenuBuilder implements MenuBuilderInterface {
  #menu: MenuType;
  #drink: ProductType | undefined;
  #mainComplement: ProductType | undefined;
  #extra: ProductType | undefined;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.#menu = undefined;
    this.#drink = undefined;
    this.#mainComplement = undefined;
    this.#extra = undefined;
  }

  withMainMenu(menu: MenuType): MenuBuilderInterface {
    this.buildMenuMinimalInfo(menu);

    return this;
  }

  withDrink(product: ProductType): MenuBuilderInterface {
    this.assertMainMenu();
    this.#drink = product;

    return this;
  }

  withMainComplement(product: ProductType): MenuBuilderInterface {
    this.assertMainMenu();

    this.#mainComplement = product;

    return this;
  }

  withExtra(product: ProductType): MenuBuilderInterface {
    this.assertMainMenu();
    product.categoryId = 'extra';
    this.#extra = product;

    return this;
  }

  /**
   * Get the menu created by the class.
   */
  getMenu(): MenuType {
    const menu = this.#menu;

    if (menu === undefined) {
      return this.buildMenuPlaceholder();
    }

    this.addProductToList(this.#drink, menu);
    this.addProductToList(this.#extra, menu);
    this.addProductToList(this.#mainComplement, menu);

    this.reset();

    return menu;
  }

  private buildMenuPlaceholder(): MenuType {
    return {
      id: '',
      image: '',
      name: '',
      price: 0,
      products: [],
    };
  }

  private addProductToList(product: ProductType | undefined, menu: MenuType): void {
    if (product) {
      menu!.products.push(product);
    }
  }

  /**
   * Throws if the current instance has none main menu.
   * @throws Error
   */
  private assertMainMenu(): void {
    if (this.#menu === undefined) {
      throw new Error(ERRORS.mainMenuNoExist);
    }
  }

  private buildMenuMinimalInfo(menu: MenuType): void {
    this.#menu = menu;
  }
}
