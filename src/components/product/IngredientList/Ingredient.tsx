import type {IngredientType} from 'src/@types/ingredient';
import {IMG_PATH} from 'src/config';
import './Ingredient.css';

type IngredientProps = {
  ingredient: IngredientType;
};

const Ingredient = ({ingredient}: IngredientProps) => (
  <>
    <img src={IMG_PATH + ingredient.img} alt={ingredient.title} className="Ingredient-image" />
    <p>{ingredient.title}</p>
  </>
);

export default Ingredient;
