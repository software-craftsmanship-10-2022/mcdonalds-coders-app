import {fireEvent, render, screen} from '@testing-library/react';
import {useEffect} from 'react';
import PRODUCTS from 'src/data/products';
import '../api/products/productsApi';
import {useProducts} from './useProducts';

// Actualmente el hook está llamando a las funciones de la api real seria necesario mockearlas
// Jest.mock('../api/products/productsApi', () => ({
//   ...jest.requireActual('../api/products/productsApi'),
//   getAllProductsFromApi: jest.fn(),
//   getProductsByCategoryFromApi: jest.fn(),
// }));

const CATEGORIES_LENGTH = 'Categories: ';
const CATEGORY_SEARCHED = 'Category searched: ';
const NOT_SELECTED = 'not selected';
const CATEGORY_SELECT_BUTTON = 'SELECT CATEGORY';
const TestComponent = () => {
  const {products, categoryProducts, getAllProducts, getProductsByCategory} = useProducts();

  useEffect(() => {
    getAllProducts();
  });

  const onClickSelectCategory = () => {
    getProductsByCategory(PRODUCTS[3].id);
  };

  return (
    <div>
      <span>
        {CATEGORIES_LENGTH}
        {products.length}
      </span>
      <button onClick={onClickSelectCategory}>{CATEGORY_SELECT_BUTTON}</button>
      <span>
        {CATEGORY_SEARCHED}
        {categoryProducts.category || NOT_SELECTED}
      </span>
    </div>
  );
};

describe('Given an useProducts hook', () => {
  test('testing component should render', () => {
    render(<TestComponent />);
  });

  test('when render the component then products should be reloaded', async () => {
    render(<TestComponent />);
    await screen.findAllByText(CATEGORIES_LENGTH + PRODUCTS.length.toString());
  });

  test('when press select category button then should search the data of fourth category', async () => {
    render(<TestComponent />);
    screen.getByText(CATEGORY_SEARCHED + NOT_SELECTED);
    const button = screen.getByText(CATEGORY_SELECT_BUTTON);
    fireEvent.click(button);
    await screen.findAllByText(CATEGORY_SEARCHED + PRODUCTS[3].category);
  });
});
