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

  it('when an array of radios is passed should render the same amount of radios as the length of the array', () => {
    const {getAllByRole} = render(<McRadio radios={radios} onChange={handleChange} />);
    expect(getAllByRole('radio')).toHaveLength(radios.length);
  });

  it('when a radio is checked should call the function with the value of that radio', () => {
    const {getAllByRole} = render(<McRadio radios={radios} onChange={handleChange} />);

    const allRadios = getAllByRole('radio');
    allRadios[1].click();

    expect(handleChange).toHaveBeenCalledWith(1);
  });
});
