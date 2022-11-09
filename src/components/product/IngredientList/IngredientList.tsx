import Ingredient from './Ingredient';

const IngredientList = ({ingredients}: {ingredients: string[]}) => (
  <div className="IngredientList">
    <h2>Ingredientes</h2>
    {ingredients.map((id, i) => (
      <Ingredient key={i} id={id} />
    ))}
  </div>
);

export default IngredientList;
