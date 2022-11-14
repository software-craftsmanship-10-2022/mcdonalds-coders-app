import {act, fireEvent, render, renderHook, screen} from '@testing-library/react';
import {useEffect, useState} from 'react';
import type {ComboType} from 'src/@types/combos';
import COMBOS from 'src/data/combos';
import useCombos from './useCombos';

const CATEGORIES_LENGTH = 'Categories: ';
const COMBO_SEARCHED = 'Combo searched: ';
const NOT_SELECTED = 'not selected';
const COMBO_SELECT_BUTTON = 'SELECT COMBO';
const TestComponent = () => {
  const {combos, getAllCombos, getComboById} = useCombos();
  const [selected, setSelected] = useState<ComboType | undefined>(undefined);

  useEffect(() => {
    getAllCombos();
  }, []);

  const onClickSelectCombo = () => {
    getComboById(COMBOS[3].items[1].id)
      .then((result) => {
        setSelected(result);
      })
      .catch(console.error);
  };

  return (
    <div>
      <span>
        {CATEGORIES_LENGTH}
        {combos.length}
      </span>
      <button onClick={onClickSelectCombo}>{COMBO_SELECT_BUTTON}</button>
      <span>
        {COMBO_SEARCHED}
        {selected?.title ?? NOT_SELECTED}
      </span>
    </div>
  );
};

describe('Given useCombos hook', () => {
  test('TestComponent should render', () => {
    act(() => {
      renderHook(() => <TestComponent />);
    });
  });

  test('when render the component then combos should be reloaded', async () => {
    render(<TestComponent />);
    await screen.findAllByText(CATEGORIES_LENGTH + COMBOS.length.toString());
  });

  test('when render the component then combos should be reloaded', async () => {
    render(<TestComponent />);
    await screen.findAllByText(CATEGORIES_LENGTH + COMBOS.length.toString());
  });

  test('when press select combo button then should search the data of fourth category', async () => {
    render(<TestComponent />);

    screen.getByText(COMBO_SEARCHED + NOT_SELECTED);

    const button = screen.getByText(COMBO_SELECT_BUTTON);
    fireEvent.click(button);

    await screen.findAllByText(COMBO_SEARCHED + COMBOS[3].items[1].title);
  });
});
