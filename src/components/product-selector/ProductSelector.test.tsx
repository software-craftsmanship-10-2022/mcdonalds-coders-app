import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import type {ProductCategoryType} from 'src/@types/product';
import {IMG_PATH} from 'src/config';
import ProductSelector from './ProductSelector';

const productCategory: ProductCategoryType = {
  category: 'Papas y Complementos',
  id: 'complements',
  items: [
    {
      categoryId: 'complements',
      id: 'Papas-pequeñas',
      img: 'Papas-pequeñas.png',
      title: 'Papas pequeñas',
      description:
        'Calientes, crujientes y deliciosas, tus aliadas perfectas para cualquier comida. Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última en su versión pequeña.',
    },
    {
      categoryId: 'complements',
      id: 'Papas-Medianas',
      img: 'Papas-Medianas.png',
      title: 'Papas Medianas',
      description:
        'Nuestro sello. Las aliadas perfectas para cualquier comida. Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última. Crujientes y deliciosas, no vas a parar hasta terminarlas todas.',
    },
  ],
};

describe('Given ProductSelector component', () => {
  let onSelectProduct: jest.Mock;
  beforeEach(() => {
    onSelectProduct = jest.fn();
    render(
      <ProductSelector
        productCategory={productCategory}
        selectedProductId={productCategory.items[1].id}
        onSelectProduct={onSelectProduct}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('when receive an ProductCategory type then should render the category name', () => {
    screen.getByText(productCategory.category);
  });

  test('when receive an ProductCategory type with items then should render a list', () => {
    screen.getByRole('list');
  });

  test('when receive an ProductCategory type then should render a list with the same number of elements', () => {
    const list = screen.getByRole('list');
    expect(list.children.length).toBe(productCategory.items.length);
  });

  test('when receive an ProductCategory type then should render a list with the items titles', () => {
    productCategory.items.forEach((item) => {
      screen.getByText(item.title);
    });
  });

  test('when receive an ProductCategory type then should render a list with the items images', () => {
    const images = screen.getAllByRole('img');
    productCategory.items.forEach((item, index) => {
      expect(images[index]).toHaveAttribute('src', IMG_PATH + item.img);
      expect(images[index]).toHaveAttribute('alt', item.title);
    });
  });

  test('when receive an ProductCategory type and click on item then should call to onSelectProduct with the item as parameter', () => {
    const buttons = screen.getAllByRole('button');
    productCategory.items.forEach((item, index) => {
      fireEvent.click(buttons[index]);
      expect(onSelectProduct).toHaveBeenLastCalledWith(item);
    });
  });

  test('when receive an ProductCategory type and with a product selected then should mark product as selected', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Papas Medianas: seleccionado');

    const notSelected = screen.getAllByLabelText(/no seleccionado/);
    expect(notSelected.length).toBe(productCategory.items.length - 1);
  });
});
