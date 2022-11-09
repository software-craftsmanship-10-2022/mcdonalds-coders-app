import {render} from '@testing-library/react';
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

describe('Given Ingredient component', () => {
  test('when the id is not exist renders null', () => {
    const {container} = render(<Ingredient id="test" />);
    expect(container).toBeEmptyDOMElement();
  });
  test('when the id exists renders the component', () => {
    const {getByText} = render(<Ingredient id="pan-arriba" />);
    const image = document.querySelector('img');
    expect(image?.src).toContain('Pan+arriba.png');

    const title = getByText('Pan');
    expect(title).toBeInTheDocument();
  });
});
