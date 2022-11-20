import type {ComboId, ComboType} from 'src/@types/combos';
import type {MenuType, ProductType} from 'src/@types/product.d';
import {getComboDetailByIdFromApi} from './combosApi';
import {getAllProductListFromApi, getProductsByCategoryFromApi} from './productsApi';

export const ERRORS = {
  mainMenuNoExist: 'The main menu has not been added',
  drinkIdNotfound: (id: string) => `The drink '${id}' does not exist`,
  complementNotFound: (id: string) => `The complment '${id}' does not exist`,
};

export interface MenuBuilderInterface {
  withMainMenu(id: ComboId): Promise<MenuBuilder>;
  withDrink(drinkId: string): Promise<MenuBuilder>;
  withMainComplement(complementId: string): Promise<MenuBuilder>;
  withExtra(extraId: string): Promise<MenuBuilder>;
  getMenu(): MenuType;
  reset(): void;
}

export class MenuBuilder implements MenuBuilderInterface {
  #menu: MenuType = this.buildMenuPlaceholder();
  #drink: ProductType | undefined;
  #mainComplement: ProductType | undefined;
  #extra: ProductType | undefined;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.#menu = this.buildMenuPlaceholder();
    this.#drink = undefined;
    this.#mainComplement = undefined;
    this.#extra = undefined;
  }

  async withMainMenu(id: ComboId): Promise<MenuBuilder> {
    this.reset();
    this.buildMenuMinimalInfo(await getComboDetailByIdFromApi(id));

    return this;
  }

  /**
   * Add the `drinkId` drink in the menu.
   * Only one drink: If the isntance adds other drink, it deletes the previous.
   *
   * @param {string} drinkId Drink id.
   * @return Promise of the current instance.
   * @throws Error The instance has defined the main manu.
   * @throws Error The `drinkId` drink doesn't exist.
   */
  async withDrink(drinkId: string): Promise<MenuBuilder> {
    this.assertMainMenu();

    const allDrinks = await getProductsByCategoryFromApi('drinks');
    const drink = allDrinks.items.find(({id}) => id === drinkId);

    if (drink === undefined) {
      throw new Error(ERRORS.drinkIdNotfound(drinkId));
    }

    this.#menu.products = this.#menu.products.filter(({categoryId}) => {
      return categoryId !== 'drinks';
    });

    this.#drink = drink;
    this.#menu.products.push(this.#drink);

    return this;
  }

  /**
   * Add the `complementId` complement in the menu.
   * Only one main complement: If the isntance adds other main complement, it deletes the previous.
   *
   * @param complementId complement id.
   * @return Promise of the current instance.
   * @throws Error The instance has defined the main manu.
   * @throws Error The `complementId` drink doesn't exist.
   */
  async withMainComplement(complementId: string): Promise<MenuBuilder> {
    this.assertMainMenu();

    const allComplements = await getProductsByCategoryFromApi('complements');
    const complement = allComplements.items.find(({id}) => id === complementId);

    if (complement === undefined) {
      throw new Error(ERRORS.complementNotFound(complementId));
    }

    this.#menu.products = this.#menu.products.filter(({categoryId}) => {
      return categoryId !== 'complements';
    });

    this.#mainComplement = complement;
    this.#menu.products.push(complement);

    return this;
  }

  /**
   * Add the `extra id` extra in the menu.
   * Only one extra: If the isntance adds other extra, it deletes the previous.
   *
   * @param extraId complement id.
   * @return Promise of the current instance.
   * @throws Error The instance has defined the main manu.
   * @throws Error The `complementId` drink doesn't exist.
   */
  async withExtra(extraId: string): Promise<MenuBuilder> {
    this.assertMainMenu();

    const allExtras = await getAllProductListFromApi();
    const extra = allExtras[extraId];

    if (extra === undefined) {
      throw new Error(ERRORS.complementNotFound(extraId));
    }

    this.#menu.products = this.#menu.products.filter(({categoryId}) => {
      return categoryId !== 'extra';
    });

    extra.categoryId = 'extra';
    this.#extra = extra;
    this.#menu.products.push(extra);

    return this;
  }

  /**
   * Get the menu created by the class.
   */
  getMenu(): MenuType {
    const result = this.#menu;
    this.reset();

    return result;
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

  /**
   * Throws if the current instance has none main menu.
   * @throws Error
   */
  private assertMainMenu(): void {
    if (this.#menu.id === '') {
      throw new Error(ERRORS.mainMenuNoExist);
    }
  }

  private buildMenuMinimalInfo(combo: ComboType): void {
    this.#menu.id = combo.id;
    this.#menu.image = combo.img;
    this.#menu.name = combo.title;
    this.#menu.price = combo.price;
    this.#menu.products.push(combo.mainProduct);
  }
}
