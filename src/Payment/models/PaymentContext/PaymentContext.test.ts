import Card from '../Card/Card';
import {DebitPaymentStrategy} from '../Debit/Debit';
import {PaymentContext} from './PaymentContext';

describe('Given a PaymentContext class', () => {
  const validCard = () => new Card('1299999999999999', '12 / 24', 123);
  const debitStrategy = new DebitPaymentStrategy(validCard());
  const payment = new PaymentContext(debitStrategy);

  it('when an instance is created then setPaymentStrategy should be defined', () => {
    expect(payment.setPaymentStrategy).toBeInstanceOf(Function);
  });

  it('when an instance is created then pay method should be defined', () => {
    expect(payment.pay).toBeInstanceOf(Function);
  });
});
