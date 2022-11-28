import type {MenuType, ProductType} from 'src/@types/product';

export const menus: Record<string, MenuType> = {
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

export const drinks: Record<string, ProductType> = {
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

export const complements: Record<string, ProductType> = {
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Patatas-pequeñas': {
    categoryId: 'complements',
    id: 'Patatas-pequeñas',
    img: 'Patatas-pequeñas.png',
    title: 'Papas pequeñas',
    description:
      'Calientes, crujientes y deliciosas, tus aliadas perfectas para cualquier comida. ' +
      'Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última en ' +
      'su versión pequeña.',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Patatas-Medianas': {
    categoryId: 'complements',
    id: 'Patatas-Medianas',
    img: 'Patatas-Medianas.png',
    title: 'Papas Medianas',
    description:
      'Nuestro sello. Las aliadas perfectas para cualquier comida. Disfrutá de nuestras papas ' +
      'mundialmente famosas, desde la primera hasta la última. Crujientes y deliciosas, ' +
      'no vas a parar hasta terminarlas todas.',
  },
};

export const mainProducts: Record<string, ProductType> = {
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
