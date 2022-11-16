import type {ComboId, ComboType} from 'src/@types/combos';
import type {MenuType} from 'src/@types/product.d';
import {getComboDetailByIdFromApi} from './combosApi';

export type MenuBuilderInterface = {
  withMainMenu(id: ComboId): void;
  // WithMainComplement(id: string): void;
  // withDrink(id: string): void;
  getMenu(): MenuType | undefined;
  reset(): void;
};

export class MenuBuilder implements MenuBuilderInterface {
  #menu: MenuType;

  constructor() {
    this.#menu = this.buildMenuPlaceholder();
  }

  reset(): void {
    this.#menu = this.buildMenuPlaceholder();
  }

  async withMainMenu(id: ComboId): Promise<MenuBuilder> {
    const combo: ComboType = await getComboDetailByIdFromApi(id);
    this.buildMenuMinimalInfo(combo);

    return this;
  }

  getMenu(): MenuType | undefined {
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
