import PRODUCTS from 'src/data/products';
import {getAllProductsFromApi} from '../api/products/productsApi';
import {useProducts} from '../hooks/useProducts';

jest.mock('../api/products/productsApi');

const TestComponent = () => {
  const {products} = useProducts();

  return (
    <div>
      <ul>
        {products.map((category) => (
          <li key={category.id}>{category.category}</li>
        ))}
      </ul>
    </div>
  );
};

describe('Given an useProducts hook', () => {
  beforeEach(() => {
    (getAllProductsFromApi as jest.Mock).mockReturnValue(PRODUCTS);
  });

  /*   test('when we use products, then it returns an object with the products array', () => {
    act(() => {
      render(<TestComponent />);
      const {products} = useProducts();
      expect(products).toEqual(PRODUCTS);
    });
  }); */

  // Test('when we call useProducts, then it returns an object with findProductsByCategoryId function', () => {
  //   const {findProductsByCategoryId} = useProducts();

  //   expect(typeof findProductsByCategoryId).toBe('function');
  // });

  // test('when we call findProductsByCategoryId, then if the param is not a string throw an Error', () => {
  //   const {findProductsByCategoryId} = useProducts();

  //   expect(() => findProductsByCategoryId(1 as any)).toThrowError(
  //     'The categoryId must be a string',
  //   );
  //   expect(() => findProductsByCategoryId(true as any)).toThrowError(
  //     'The categoryId must be a string',
  //   );
  // });

  // test('when we call findProductsByCategoryId with a category, then it returns the products with the category id', () => {
  //   const {findProductsByCategoryId} = useProducts();

  //   const categoryId = 'burgers';
  //   const products = findProductsByCategoryId(categoryId);

  //   const foundProducts = PRODUCTS.find((productCategory) => productCategory.id === categoryId);

  //   expect(products).toEqual(foundProducts);
  // });
});
