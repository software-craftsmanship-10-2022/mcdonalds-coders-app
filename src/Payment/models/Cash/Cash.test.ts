import {mockNewOrder} from 'src/api/orders/mocks/mocks';
import Donation from '../Donation/Donation';
import Cash from './Cash';

describe('Given a CashPaymentStrategy class', () => {
  it('should contain a pay method', () => {
    const order = mockNewOrder();
    const donation = new Donation(0);
    const cash = new Cash(order, donation);
    expect(cash.pay).toBeInstanceOf(Function);
  });
});
