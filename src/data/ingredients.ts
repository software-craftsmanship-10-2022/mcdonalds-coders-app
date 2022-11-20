import type {IngredientType} from '../@types/ingredient';

// Categories & products
const INGREDIENTS: IngredientType[] = [
  {
    id: 'pan-arriba',
    title: 'Pan',
    extraPrice: 0,
    img: 'Pan+arriba.png',
    modifiable: false,
  },
  {
    id: 'pan-abajo',
    title: 'Pan',
    extraPrice: 0,
    img: 'Pan+abajo.png',
    modifiable: false,
  },
  {
    id: 'queso',
    title: 'Queso',
    img: 'queso.png',
    extraPrice: 0.5,
    modifiable: true,
  },
  {
    id: 'salsa-bigmac',
    title: 'Salsa Big Mac',
    img: 'salsa-bic-mac.png',
    extraPrice: 0,
    modifiable: true,
  },
  {
    id: 'bacon',
    title: 'Bacon',
    img: 'bacon.png',
    extraPrice: 0.5,
    modifiable: true,
  },
  {
    id: 'pollo',
    title: 'Pollo',
    img: 'pollo.png',
    extraPrice: 0.8,
    modifiable: false,
  },
  {
    id: 'carne',
    title: 'Carne',
    img: 'carne.png',
    extraPrice: 0,
    modifiable: false,
  },
];

export default INGREDIENTS;
