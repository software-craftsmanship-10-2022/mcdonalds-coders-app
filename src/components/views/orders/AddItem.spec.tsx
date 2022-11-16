import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {URLS} from 'src/config';
import {OrderProvider, useOrderContext} from 'src/context/OrderContext';
import AddItem from './AddItem';

function ShowOrder(): JSX.Element {
  const {order} = useOrderContext() || {};

  if (!order || order?.isItemsEmpty()) {
    return <div>No hay menús</div>;
  }

  return (
    <ul>
      {order?.getItems().map((menu, index) => (
        <li key={`key-${index}`}>Menú -- {menu.name}</li>
      ))}
    </ul>
  );
}

function RenderWithRouter(): JSX.Element {
  const url = `${URLS.ordersAdd}bacon/0f6fbXbWUp`;
  const mainComponent = (
    <div>
      <OrderProvider>
        <AddItem />
        <ShowOrder />
      </OrderProvider>
    </div>
  );

  return (
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route index path={`${URLS.ordersAdd}:category/:id`} element={mainComponent} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Test AddItem component', () => {
  describe('test when click in "Agregar al pedido" button', () => {
    it('exists the button', async () => {
      await act(async () => {
        render(<RenderWithRouter />);
      });

      expect(screen.getByText(/Agregar al pedido/)).toBeInTheDocument();
    });

    it('when click Aregar al pedido before select a complement then must show modal alert', async () => {
      await act(async () => {
        render(<RenderWithRouter />);
      });

      const button = screen.getByAltText(/Añadir/).parentNode as HTMLButtonElement;
      fireEvent.click(button);
      fireEvent.click(screen.getByText(/Agregar al pedido/));
      await screen.findAllByText(
        'No has seleccionado un acompañamiento, pero no te preocupes estas a tiempo de mejorar tu combo',
      );
    });

    it('when click Aregar al pedido before select a complement then must show modal alert', async () => {
      await act(async () => {
        render(<RenderWithRouter />);
      });

      const complementButton = screen.getByLabelText('Papas pequeñas: no seleccionado');
      fireEvent.click(complementButton);

      const button = screen.getByAltText(/Añadir/).parentNode as HTMLButtonElement;
      fireEvent.click(button);
      fireEvent.click(screen.getByText(/Agregar al pedido/));
      await screen.findAllByText('No has seleccionado una bebida, no queremos que te deshidrates');
    });

    it('clicks in button after click in the "increment counter" button', async () => {
      await act(async () => {
        render(<RenderWithRouter />);
      });

      const complementButton = screen.getByLabelText('Papas pequeñas: no seleccionado');
      fireEvent.click(complementButton);

      const drinkButton = screen.getByLabelText('Agua sin gas (500ml): no seleccionado');
      fireEvent.click(drinkButton);

      const button = screen.getByAltText(/Añadir/).parentNode as HTMLButtonElement;
      fireEvent.click(button);
      fireEvent.click(screen.getByText(/Agregar al pedido/));

      await waitFor(() => {
        const items = screen.getAllByText(/Menú -- McCombo Grand Triple Mc Bacon Grande/);
        expect(items[0]).toBeInTheDocument();
        expect(items[1]).toBeInTheDocument();
      });
    });
  });
});
