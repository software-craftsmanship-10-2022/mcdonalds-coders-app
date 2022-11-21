import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {useEffect} from 'react';
import {MemoryRouter, Route, Routes, useNavigate} from 'react-router-dom';
import createEmptyOrder from 'src/api/orders/createEmptyOrder';
import saveOrder from 'src/api/orders/saveOrder';
import {STORAGE, URLS} from 'src/config';
import {OrderProvider, useOrderContext} from 'src/context/OrderContext';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Checkout from './Checkout';

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: () => 'random id',
  },
});

const dummyOrder = createEmptyOrder();

dummyOrder.addItem({
  id: '0f6fbXbWUp',
  name: 'prueba',
  image: 'McCOMBOGRANDTRIPLEMcBACONGrande.png',
  price: 1320,
  products: [],
});

function ShowOrder(): JSX.Element {
  const {order} = useOrderContext() || {};

  return <div>The order id is: {order.getId()}</div>;
}

function ComponentWithRouter(): JSX.Element {
  const DummyComponent = () => {
    const {order, updateOrder} = useOrderContext();
    const mockConfirmOrder = async () => {
      updateOrder(await saveOrder(order));
    };

    return (
      <div>
        <ShowOrder />
        <Checkout order={order} confirmOrder={mockConfirmOrder} test-id="test" />
      </div>
    );
  };

  const MainComponent = () => {
    const {order} = useOrderContext() || {};
    const navigate = useNavigate();
    const {setStorageItem} = useLocalStorage();
    useEffect(() => {
      order?.addItem({
        id: '0f6fbXbWUp',
        name: 'prueba',
        image: 'McCOMBOGRANDTRIPLEMcBACONGrande.png',
        price: 1320,
        products: [],
      });
    }, []);
    useEffect(() => {
      setStorageItem(STORAGE.users, {user: 'user'});
      !order?.isItemsEmpty() && navigate(URLS.ordersCheckout);
    }, [order]);

    return null;
  };

  return (
    <OrderProvider>
      <MemoryRouter initialEntries={[URLS.root]}>
        <Routes>
          <Route path={`${URLS.ordersCheckout}`} element={<DummyComponent />} />
          <Route index path={URLS.root} element={<MainComponent />} />
        </Routes>
      </MemoryRouter>
    </OrderProvider>
  );
}

describe('Test Checkout component', () => {
  describe('Test the order confirmation', () => {
    it('checks the confirm button exists', async () => {
      await act(async () => {
        render(<ComponentWithRouter />);
      });
      await waitFor(() => {
        screen.getByText(/Enviar pedido/);
      });
    });

    xit('checks the order is saved when it clicks in the button', async () => {
      const orderId = '1234abc';
      const dummyOrderWithId = dummyOrder;
      dummyOrderWithId.setId(orderId);

      await act(async () => {
        render(<ComponentWithRouter />);
      });

      const button = screen.getByText(/Enviar pedido/);
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(/The order id is: 1234abc/)).toBeInTheDocument();
      });
    });
  });
});
