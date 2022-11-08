import {render} from '@testing-library/react';
import McRadio from './McRadio';

// TODO add setState function
// import { Dispatch, SetStateAction } from "react";

// interface IProps {
//   myVar: boolean;
//  setMyVar?: Dispatch<SetStateAction<boolean>>;
// }

describe('given a McRadio component', () => {
  const radios = [
    {label: '0€', value: 0},
    {label: '1€', value: 1},
    {label: '5€', value: 5},
  ];
  it('should render', () => {
    const {getAllByRole} = render(<McRadio radios={radios} />);
    expect(getAllByRole('radio')).toBeDefined();
  });

  it('should render the same radios as the radios array given', () => {
    const radios = [
      {label: '0€', value: 0},
      {label: '1€', value: 1},
      {label: '5€', value: 5},
    ];
    const {getAllByRole} = render(<McRadio radios={radios} />);
    expect(getAllByRole('radio')).toHaveLength(radios.length);
  });
});
