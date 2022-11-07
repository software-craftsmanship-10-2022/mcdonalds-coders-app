import PRODUCTS from 'src/data/products';
import {getAllProducts} from '../api/products/productsApi';
import {useProducts} from '../hooks/useProducts';

jest.mock('../api/products/productsApi');

describe('Given an useProducts hook', () => {
  beforeEach(() => {
    (getAllProducts as jest.Mock).mockReturnValue(PRODUCTS);
  });

  test('when we use products, then it returns an object with the products array', () => {
    const {products} = useProducts();

    expect(products).toEqual(PRODUCTS);
  });

  test('when we call useProducts, then it returns an object with findProductsByCategory function', () => {
    const {findProductsByCategory} = useProducts();

    expect(typeof findProductsByCategory).toBe('function');
  });

  /*   Test('when we call findProductsByCategory, then if the param is not a string throw an Error', () => {
    const {findProductsByCategory} = useProducts();

    expect(() => findProductsByCategory(1) as any).toThrowError('The category must be a string');
    expect(() => findProductsByCategory(true) as any).toThrowError('The category must be a string');
  }); */

  test('when we call findProductsByCategory with a category, then it returns the products with the category id', () => {
    const {findProductsByCategory} = useProducts();

    const category = 'Hamburguesas';
    const products = findProductsByCategory(category);

    const foundProducts = PRODUCTS.find((productCategory) => productCategory.id === category);

    expect(products).toEqual(foundProducts);
  });
});
