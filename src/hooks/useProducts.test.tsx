import {fireEvent, render, screen} from '@testing-library/react';
import {useEffect} from 'react';
import PRODUCTS from 'src/data/products';
import {getAllProductsFromApi, getProductsByCategoryFromApi} from '../api/products/productsApi';
import {useProducts} from './useProducts';

jest.mock('../api/products/productsApi');

const CATEGORIES_LENGTH = 'Categories: ';
const CATEGORY_SEARCHED = 'Category searched: ';
const NOT_SELECTED = 'not selected';
const CATEGORY_SELECT_BUTTON = 'SELECT CATEGORY';
const TestComponent = () => {
  const {products, categoryProducts, getAllProducts, getProductsByCategory} = useProducts();

  useEffect(() => {
    getAllProducts();
  }, []);

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
  let getAllProductsMock: jest.Mock;
  let getProductsByCategoryMock: jest.Mock;

  beforeEach(() => {
    getAllProductsMock = (getAllProductsFromApi as jest.Mock).mockResolvedValue(PRODUCTS);
    getProductsByCategoryMock = (getProductsByCategoryFromApi as jest.Mock).mockResolvedValue(
      PRODUCTS[3],
    );
  });

  test('testing component should render', () => {
    render(<TestComponent />);
  });

  test('when render the component then products should be reloaded', async () => {
    (getAllProductsFromApi as jest.Mock).mockResolvedValue(PRODUCTS);
    render(<TestComponent />);
    await screen.findAllByText(CATEGORIES_LENGTH + PRODUCTS.length.toString());
    expect(getAllProductsMock).toBeCalledTimes(1);
  });

  test('when press select category button then should search the data of fourth category', async () => {
    render(<TestComponent />);
    screen.getByText(CATEGORY_SEARCHED + NOT_SELECTED);
    const button = screen.getByText(CATEGORY_SELECT_BUTTON);
    fireEvent.click(button);
    await screen.findAllByText(CATEGORY_SEARCHED + PRODUCTS[3].category);
    expect(getProductsByCategoryMock).toBeCalledTimes(1);
  });
});
