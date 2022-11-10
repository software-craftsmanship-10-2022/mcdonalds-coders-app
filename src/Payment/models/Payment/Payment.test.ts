import {PAYMENT_TYPE} from 'src/config';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';
import Payment from './Payment';

describe('Given a Payment class', () => {
  it('when an instance is created then pay method should be defined', () => {
    const payment = new Payment(PAYMENT_TYPE.cash, new Order(45), new Donation(0));
    expect(payment.pay).toBeInstanceOf(Function);
  });
});
