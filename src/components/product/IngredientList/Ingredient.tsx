import type {IngredientID} from 'src/@types/ingredient';
import {IMG_PATH} from 'src/config';
import INGREDIENTS from 'src/data/ingredients';
import './Ingredient.css';

type IngredientProps = {
  id: IngredientID;
};

const getIngredientById = (id: IngredientID) =>
  INGREDIENTS.find((ingredient) => ingredient.id === id);

const Ingredient = ({id}: IngredientProps) => {
  const ingredient = getIngredientById(id);
  return ingredient ? (
    <>
      <img src={IMG_PATH + ingredient.img} alt={ingredient.title} className="Ingredient-image" />
      <p>{ingredient.title}</p>
    </>
  ) : null;
};

export default Ingredient;
