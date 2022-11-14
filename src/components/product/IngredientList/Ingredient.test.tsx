import {render} from '@testing-library/react';
import type {IngredientType} from 'src/@types/ingredient';
import Ingredient from './Ingredient';

jest.mock('src/data/ingredients', () => [
  {
    id: 'pan-arriba',
    title: 'Pan',
    extraPrice: 0,
    img: 'Pan+arriba.png',
    modifaible: false,
  },
]);

const ingredient: IngredientType = {
  id: 'pan-arriba',
  title: 'Pan',
  extraPrice: 0,
  img: 'Pan+arriba.png',
  modifaible: false,
};

describe('Given Ingredient component', () => {
  test('renders correctly', () => {
    const {getByText} = render(<Ingredient ingredient={ingredient} />);
    const image = document.querySelector('img');
    expect(image?.src).toContain(ingredient.img);

    const title = getByText(ingredient.title);
    expect(title).toBeInTheDocument();
  });
});
