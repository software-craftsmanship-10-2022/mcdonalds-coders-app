import type {MenuType, ProductType} from 'src/@types/product.d';

export const ERRORS = {
  mainMenuNoExist: 'The main menu has not been added',
  drinkIdNotfound: (id: string) => `The drink '${id}' does not exist`,
  complementNotFound: (id: string) => `The complment '${id}' does not exist`,
};

export interface MenuBuilderInterface {
  withMainProduct(product: ProductType): MenuBuilderInterface;
  withMainMenu(menu: MenuType): MenuBuilderInterface;
  withDrink(product: ProductType): MenuBuilderInterface;
  withComplement(product: ProductType): MenuBuilderInterface;
  withExtra(product: ProductType): MenuBuilderInterface;
  getMenu(): MenuType;
  reset(): void;
}

export class MenuBuilder implements MenuBuilderInterface {
  #menu: MenuType;
  #mainProduct: ProductType;
  #drink: ProductType | undefined;
  #complement: ProductType | undefined;
  #extra: ProductType | undefined;

  constructor() {
    this.reset();
    this.#menu = this.buildMenuPlaceholder();
    this.#mainProduct = this.buildMainProductPlaceholder();
  }

  reset(): void {
    this.#menu = this.buildMenuPlaceholder();
    this.#mainProduct = this.buildMainProductPlaceholder();
    this.#drink = undefined;
    this.#complement = undefined;
    this.#extra = undefined;
  }

  withMainMenu(menu: MenuType): MenuBuilderInterface {
    this.buildMenuMinimalInfo(menu);

    return this;
  }

  withMainProduct(product: ProductType): MenuBuilderInterface {
    this.assertMainMenu();
    this.#mainProduct = product;

    return this;
  }

  withDrink(product: ProductType | undefined): MenuBuilderInterface {
    this.assertMainMenu();
    this.#drink = product;

    return this;
  }

  withComplement(product: ProductType | undefined): MenuBuilderInterface {
    this.assertMainMenu();

    this.#complement = product;

    return this;
  }

  withExtra(product: ProductType | undefined): MenuBuilderInterface {
    this.assertMainMenu();

    if (product) {
      product.categoryId = 'extra';
    }

    this.#extra = product;

    return this;
  }

  /**
   * Get the menu created by the class.
   */
  getMenu(): MenuType {
    const menu = this.#menu;

    if (menu.id === '') {
      throw new Error(ERRORS.mainMenuNoExist);
    }

    menu.mainProduct = this.#mainProduct;
    this.addProductToList(this.#drink, menu);
    this.addProductToList(this.#extra, menu);
    this.addProductToList(this.#complement, menu);

    this.reset();

    return menu;
  }

  private buildMenuPlaceholder(): MenuType {
    return {
      id: '',
      image: '',
      name: '',
      price: 0,
      mainProduct: this.buildMainProductPlaceholder(),
      products: [],
    };
  }

  private addProductToList(product: ProductType | undefined, menu: MenuType): void {
    const productWithSameCategory = menu.products.find(
      (menuProduct) => menuProduct.categoryId === product?.categoryId,
    );

    if (productWithSameCategory) {
      const newProducts = menu.products.filter(
        (menuProduct) => menuProduct.id !== productWithSameCategory.id,
      );

      menu.products.pop();
      menu.products = newProducts;

      this.pushProduct(product, menu);
    }

    this.pushProduct(product, menu);
  }

  private pushProduct(product: ProductType | undefined, menu: MenuType) {
    if (product) {
      menu.products.push(product);
    }
  }

  /**
   * Throws if the current instance has none main menu.
   * @throws Error
   */
  private assertMainMenu(): void {
    if (this.#menu === undefined || this.#menu.id === '') {
      throw new Error(ERRORS.mainMenuNoExist);
    }
  }

  private buildMenuMinimalInfo(menu: MenuType): void {
    this.#menu = menu;
  }

  private buildMainProductPlaceholder(): ProductType {
    return {
      categoryId: 'burgers',
      description: '',
      id: '',
      img: '',
      ingredients: [],
      title: '',
    };
  }
}
