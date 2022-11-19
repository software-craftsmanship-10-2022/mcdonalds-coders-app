import type {ComboId, ComboType} from 'src/@types/combos';
import type {MenuType, ProductType} from 'src/@types/product.d';
import {getComboDetailByIdFromApi} from './combosApi';
import {getProductsByCategoryFromApi} from './productsApi';

export const ERRORS = {
  mainMenuNoExist: 'The main menu has not been added',
  drinkIdNotfound: (id: string) => `The drink '${id}' does not exist`,
};

export type MenuBuilderInterface = {
  withMainMenu(id: ComboId): Promise<MenuBuilder>;
  withDrink(id: string): Promise<MenuBuilder>;
  // WithMainComplement(id: string): void;
  getMenu(): MenuType;
  reset(): void;
};

export class MenuBuilder implements MenuBuilderInterface {
  #menu: MenuType;
  #existMainMenu: boolean;

  constructor() {
    this.#menu = undefined as unknown as MenuType;
    this.#existMainMenu = false;

    this.reset();
  }

  reset(): void {
    this.#menu = this.buildMenuPlaceholder();
    this.#existMainMenu = false;
  }

  async withMainMenu(id: ComboId): Promise<MenuBuilder> {
    this.reset();
    this.buildMenuMinimalInfo(await getComboDetailByIdFromApi(id));
    this.#existMainMenu = true;

    return this;
  }

  /**
   * Add the `drinkId` drink in the menu.
   *
   * Notes:
   * - To add the drink, first, the instance must create the main menu.
   * - Only one drink: If the instance adds other drink is added, it deletes the previous.
   *
   * @param drinkId Drink id.
   * @return Promise of the current instance.
   * @throws Error The instance doesn't has the main manu.
   * @throws The `drinkId` drink doesn't exist.
   */
  async withDrink(drinkId: string): Promise<MenuBuilder> {
    if (!this.#existMainMenu) {
      throw new Error(ERRORS.mainMenuNoExist);
    }

    const allDrinks = await getProductsByCategoryFromApi('drinks');
    const drink = allDrinks.items.find(({id}) => id === drinkId);

    if (drink === undefined) {
      throw new Error(ERRORS.drinkIdNotfound(drinkId));
    }

    this.#menu.products = this.#menu.products.filter((product) => product.categoryId !== 'drinks');
    this.#menu.products.push(drink);

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

  private buildMenuMinimalInfo(combo: ComboType): void {
    this.#menu.id = combo.id;
    this.#menu.image = combo.img;
    this.#menu.name = combo.title;
    this.#menu.price = combo.price;
    this.#menu.products.push(combo.mainProduct);
  }
}
