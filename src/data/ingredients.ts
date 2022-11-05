import { IngredientType } from "../@types/ingredient";

// Categories & products
const INGREDIENTS: IngredientType[] = [
  {
    id: "pan-arriba",
    title: "Pan",
    extraPrice: 0,
    img: "/Pan+arriba.png",
    modifaible: false,
  },
  {
    id: "pan-abajo",
    title: "Pan",
    extraPrice: 0,
    img: "/Pan+abajo.png",
    modifaible: false,
  },
  {
    id: "queso",
    title: "Queso",
    img: "/queso.png",
    extraPrice: 0.5,
    modifaible: true,
  },
  {
    id: "salsa-bicmac",
    title: "Salsa Big Mac",
    img: "/salsa-bic-mac.png",
    extraPrice: 0,
    modifaible: false,
  },
];
