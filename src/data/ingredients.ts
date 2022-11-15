import type {IngredientType} from '../@types/ingredient';

// Categories & products
const INGREDIENTS: IngredientType[] = [
  {
    id: 'pan-arriba',
    title: 'Pan',
    extraPrice: 0,
    img: 'Pan+arriba.png',
    modifaible: false,
  },
  {
    id: 'pan-abajo',
    title: 'Pan',
    extraPrice: 0,
    img: 'Pan+abajo.png',
    modifaible: false,
  },
  {
    id: 'queso',
    title: 'Queso',
    img: 'queso.png',
    extraPrice: 0.5,
    modifaible: true,
  },
  {
    id: 'salsa-bigmac',
    title: 'Salsa Big Mac',
    img: 'salsa-bic-mac.png',
    extraPrice: 0,
    modifaible: true,
  },
  {
    id: 'bacon',
    title: 'Bacon',
    img: 'bacon.png',
    extraPrice: 0.5,
    modifaible: true,
  },
  {
    id: 'pollo',
    title: 'Pollo',
    img: 'pollo.png',
    extraPrice: 0.8,
    modifaible: false,
  },
  {
    id: 'carne',
    title: 'Carne',
    img: 'carne.png',
    extraPrice: 0,
    modifaible: false,
  },
];

export default INGREDIENTS;
