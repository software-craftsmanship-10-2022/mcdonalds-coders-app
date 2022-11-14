import Donation from '../Donation/Donation';
import Order from '../Order/Order';
import Cash from './Cash';

describe('Given a Cash class', () => {
  it('should contain a pay method', () => {
    const order = new Order(200);
    const donation = new Donation(0);
    const cash = new Cash(order, donation);
    expect(cash.pay).toBeInstanceOf(Function);
  });
});
