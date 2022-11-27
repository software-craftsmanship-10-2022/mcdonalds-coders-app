import Card from '../Card/Card';
import {DebitPaymentStrategy} from './Debit';

const VALID_CARD_NUMBER = '1299999999999999';
const validCard = () => new Card(VALID_CARD_NUMBER, '12 / 24', '123');

describe('Given a DebitPaymentStrategy class', () => {
  it('should contain a pay method', () => {
    const debit = new DebitPaymentStrategy(validCard());
    expect(debit.pay).toBeInstanceOf(Function);
  });
});
