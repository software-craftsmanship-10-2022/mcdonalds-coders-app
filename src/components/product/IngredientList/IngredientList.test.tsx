import {render} from '@testing-library/react';
import IngredientList from './IngredientList';

const IngredientComponent = () => <>IngredientComponent</>;

jest.mock('./Ingredient', () => IngredientComponent);

describe('Given IngredientList component', () => {
  test('When the array is empty the title is render', () => {
    const {getByRole, queryByText} = render(<IngredientList ingredients={[]} />);
    expect(getByRole('heading', {level: 2})).toBeInTheDocument();
    expect(queryByText('IngredientComponent')).not.toBeInTheDocument();
  });
  test('When the array is full the Ingredient component is rendered', () => {
    const {getByRole, getByText} = render(<IngredientList ingredients={['queso']} />);
    expect(getByRole('heading', {level: 2})).toBeInTheDocument();
    expect(getByText('IngredientComponent')).toBeInTheDocument();
  });
});
