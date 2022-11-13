import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {jest} from '@jest/globals';
import {Order} from '../api/orders/Orders';
import {useOrderContext, OrderProvider} from './OrderContext';
import type {OrderContextType} from '../@types/order';
import {storage} from 'src/utils/localStorage';
import {OrderStatus, PaymentMethod} from 'src/@types/order';
import createEmptyOrder from 'src/api/orders/createEmptyOrder';

function DummyComponent({futureOrder}: {futureOrder?: Order}) {
  const value = useOrderContext();

  const {order} = value as {order: Order};
  const {updateOrder, resetOrder}: OrderContextType = value;

  const onClickButton = () => {
    futureOrder && updateOrder(futureOrder);
  };

  return (
    <>
      <button type="button" onClick={onClickButton} />
      <button type="button" onClick={resetOrder} />
      <ul>
        <li>Order id: {order.getId()}.</li>
        <li>
          <ul>
            <li>Details id: {order.getDetails().id}.</li>
            <li>Details name: {order.getDetails().name}.</li>
            <li>Details address: {order.getDetails().address}.</li>
            <li>Details image: {order.getDetails().image}.</li>
          </ul>
        </li>
        <li>Order payment: {order.getPayment()}.</li>
        <li>Order status: {order.getStatus()}.</li>
      </ul>
    </>
  );
}

function OrderProviderTest({order}: {order?: Order}) {
  return (
    <OrderProvider>
      <DummyComponent futureOrder={order} />
    </OrderProvider>
  );
}

function testDummyComponent(order: Order) {
  const id = order.getId();
  const status = order.getStatus();
  const payment = order.getPayment();
  const details = order.getDetails();

  expect(screen.getByText(new RegExp(`Order id: ${id}`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Order status: ${status}.`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Order payment: ${payment}.`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Details id: ${details.id}.`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Details name: ${details.name}.`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Details address: ${details.address}.`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`Details image: ${details.image}.`))).toBeInTheDocument();
}

describe('Test OrderContext component', () => {
  let mockGetItem: jest.SpiedFunction<typeof storage.getItem>;
  let mockSetItem: jest.SpiedFunction<typeof storage.setItem>;

  beforeEach(() => {
    mockGetItem = jest.spyOn(storage, 'getItem') as jest.SpiedFunction<typeof storage.getItem>;
    mockSetItem = jest.spyOn(storage, 'setItem') as jest.SpiedFunction<typeof storage.setItem>;
  });

  afterEach(() => {
    mockGetItem.mockRestore();
    mockSetItem.mockRestore();
  });

  it('checks the order property when it has default value', () => {
    render(<OrderProviderTest />);
    testDummyComponent(createEmptyOrder());
  });

  it('checks how the component uses the order stores in web storage.', async () => {
    const order: Order = new Order({
      id: 'a3',
      details: {
        id: 'a4',
        name: 'name 1',
        address: 'address 1',
        image: 'image 1',
        isDelivery: false,
      },
      items: [],
      payment: PaymentMethod.debit,
      status: OrderStatus.delivering,
    });

    mockGetItem.mockResolvedValue(order);
    render(<OrderProviderTest />);

    await waitFor(() => {
      expect(screen.getByText(/Order id: a3/)).toBeInTheDocument();
      testDummyComponent(order);
    });
  });

  describe('Test `updateOrder` function', () => {
    it('checks it updates the `order` property correctly in the component', async () => {
      const order: Order = new Order({
        id: 'a3',
        details: {
          id: 'a4',
          name: 'name 1',
          address: 'address 1',
          image: 'image 1',
          isDelivery: false,
        },
        items: [],
        payment: PaymentMethod.debit,
        status: OrderStatus.delivering,
      });

      await act(async () => {
        render(<OrderProviderTest order={order} />);
      });

      const [button] = screen.getAllByRole('button');
      fireEvent.click(button);
      testDummyComponent(order);
    });

    it('checks the function saves the updated order in the cache', async () => {
      const order: Order = new Order({
        id: 'a4',
        details: {
          id: 'a5',
          name: 'name 2',
          address: 'address 2',
          image: 'image 3',
          isDelivery: false,
        },
        items: [],
        payment: PaymentMethod.debit,
        status: OrderStatus.delivering,
      });

      await act(async () => {
        render(<OrderProviderTest order={order} />);
      });

      const [button] = screen.getAllByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSetItem.mock.lastCall[1]).toEqual(order);
      });
    });
  });

  describe('Test `resetOrder` funtion', () => {
    it('checks the order is reseted', async () => {
      const order: Order = new Order({
        id: 'a4',
        details: {
          id: 'a5',
          name: 'name 2',
          address: 'address 2',
          image: 'image 3',
          isDelivery: false,
        },
        items: [],
        payment: PaymentMethod.debit,
        status: OrderStatus.delivering,
      });

      await act(async () => {
        render(<OrderProviderTest order={order} />);
      });

      const [updateButton, resetButton] = screen.getAllByRole('button');

      // Click in update button
      fireEvent.click(updateButton);
      await waitFor(() => {
        expect(screen.getByText(/Order id: a4/)).toBeInTheDocument();
        testDummyComponent(order);
      });

      fireEvent.click(resetButton);
      await waitFor(() => {
        expect(screen.getByText(/Order id: /)).toBeInTheDocument();
        testDummyComponent(createEmptyOrder());
      });
    });

    it('checks the empty order is stored in the cache system', async () => {
      const order: Order = new Order({
        id: 'a4',
        details: {
          id: 'a5',
          name: 'name 2',
          address: 'address 2',
          image: 'image 3',
          isDelivery: false,
        },
        items: [],
        payment: PaymentMethod.debit,
        status: OrderStatus.delivering,
      });

      await act(async () => {
        render(<OrderProviderTest order={order} />);
      });

      const [updateButton, resetButton] = screen.getAllByRole('button');

      // Click in update button
      fireEvent.click(updateButton);
      await waitFor(() => {
        expect(screen.getByText(/Order id: a4/)).toBeInTheDocument();
        testDummyComponent(order);
      });

      fireEvent.click(resetButton);
      await waitFor(() => {
        expect(mockSetItem.mock.lastCall[1]).toEqual(createEmptyOrder());
      });
    });
  });
});
