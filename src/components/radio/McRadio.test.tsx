import {render} from '@testing-library/react';
import McRadio from './McRadio';

describe('given a McRadio component', () => {
  const radios = [
    {label: '0€', value: 0},
    {label: '1€', value: 1},
    {label: '5€', value: 5},
  ];

  const handleChange = jest.fn();

  it('should render', () => {
    const {getAllByRole} = render(<McRadio radios={radios} onChange={handleChange} />);
    expect(getAllByRole('radio')).toBeDefined();
  });

  it('should render the same radios as the radios array given', () => {
    const {getAllByRole} = render(<McRadio radios={radios} onChange={handleChange} />);
    expect(getAllByRole('radio')).toHaveLength(radios.length);
  });

  it('should call the function handleChange with the value of the radio', () => {
    const {getAllByRole} = render(<McRadio radios={radios} onChange={handleChange} />);

    const allRadios = getAllByRole('radio');
    allRadios[1].click();

    expect(handleChange).toHaveBeenCalledWith(1);
  });
});
