import type {IngredientType} from 'src/@types/ingredient';
import Ingredient from './Ingredient';
import './IngredientList.css';

const IngredientList = ({ingredients}: {ingredients: IngredientType[]}) => (
  <div className="IngredientList">
    <h2>Ingredientes</h2>
    {ingredients.map((ingredient, i) => (
      <Ingredient key={i} ingredient={ingredient} />
    ))}
  </div>
);

export default IngredientList;
