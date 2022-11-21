import {render, screen, waitFor} from '@testing-library/react';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// Import saveOrder from 'src/api/orders/saveOrder';
import type Order from 'src/api/orders/Order';
import saveOrder, * as saveOrderObject from 'src/api/orders/saveOrder';
import {STORAGE, URLS} from 'src/config';
import {useOrderContext} from 'src/context/OrderContext';
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

const ShowOrder: React.FC<{order: Order}> = ({order}) => {
  return <div>The order id is: {order.getId()}</div>;
};

function ComponentWithRouter(): JSX.Element {
  const DummyComponent = () => {
    const {order, updateOrder} = useOrderContext();
    const mockConfirmOrder = async () => {
      const awaitOrder = await saveOrder(order);
      updateOrder(awaitOrder);
    };

    return (
      <div>
        <ShowOrder order={order} />
        <Checkout order={order} confirmOrder={mockConfirmOrder} test-id="test" />
      </div>
    );
  };

  const MainComponent = () => {
    const {order} = useOrderContext() || {};
    const navigate = useNavigate();
    const {setStorageItem} = useLocalStorage();
    useEffect(() => {
      setStorageItem(STORAGE.users, {user: 'user'});
      navigate(URLS.ordersCheckout);
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
    let spyGetOrder: jest.SpiedFunction<typeof storage.getItem>;
    let spySaveOrder: jest.SpiedFunction<typeof saveOrderObject.default>;

    beforeEach(() => {
      spyGetOrder = jest.spyOn(storage, 'getItem');
      spySaveOrder = jest.spyOn(saveOrderObject, 'default');
    });

    afterEach(() => {
      spyGetOrder.mockRestore();
      spySaveOrder.mockRestore();
    });

    it('checks the confirm button exists', async () => {
      render(<ComponentWithRouter />);
      await waitFor(() => {
        screen.getByText(/Enviar pedido/);
      });
    });

    it('checks the order is saved when it clicks in the button', async () => {
      const orderId = '1234abc';
      const dummyOrderWithId = dummyOrder;
      dummyOrderWithId.setId(orderId);
      spySaveOrder.mockResolvedValue(dummyOrderWithId);

      render(<ComponentWithRouter />);

      //       const button = screen.getByText(/Enviar pedido/);
      //       fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(/The order id is: 1234abc/)).toBeInTheDocument();
      });
    });
  });
});
