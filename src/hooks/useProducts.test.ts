import PRODUCTS from 'src/data/products';
import {getAllProducts} from '../api/products/productsApi';
import {useProducts} from '../hooks/useProducts';

jest.mock('../api/products/productsApi');

describe('Given an useProducts hook', () => {
  beforeEach(() => {
    (getAllProducts as jest.Mock).mockReturnValue(PRODUCTS);
  });

  test('when we use products, then it returns an object with the products array', async () => {
    const {products}: any = await useProducts();

    expect(products).toEqual(PRODUCTS);
  });

  test('when we call useProducts, then it returns an object with findProductsByCategory function', async () => {
    const {findProductsByCategory}: any = await useProducts();

    expect(typeof findProductsByCategory).toBe('function');
  });
  test('when we call findProductsByCategory, then if the param is not a string throw an Error', async () => {
    const {findProductsByCategory}: any = await useProducts();

    expect(() => findProductsByCategory(1) as unknown).toThrowError(
      'The category must be a string',
    );
    expect(() => findProductsByCategory(true) as unknown).toThrowError(
      'The category must be a string',
    );
  });

  test('when we call findProductsByCategory with a category, then it returns the products with the category id', async () => {
    const {findProductsByCategory}: any = await useProducts();

    const category = 'Hamburguesas';
    const products = findProductsByCategory(category);

    const foundProducts = PRODUCTS.find((productCategory) => productCategory.id === category);

    expect(products).toEqual(foundProducts);
  });
});
