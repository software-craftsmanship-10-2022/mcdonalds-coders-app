import {MenuBuilder} from './builder';

describe('[MenuBuilder]', () => {
  it('should create a new MenuBuilder instance with an empty menu', () => {
    const menuBuilder = new MenuBuilder();

    expect(menuBuilder).toBeInstanceOf(MenuBuilder);
    expect(menuBuilder.getMenu()).toEqual({id: '', image: '', name: '', price: 0, products: []});
  });

  it('should build a main menu', async () => {
    const menuBuilder = new MenuBuilder();

    expect((await menuBuilder.withMainMenu('kj7Stiwpn5')).getMenu()).toEqual({
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
    });
  });
});
