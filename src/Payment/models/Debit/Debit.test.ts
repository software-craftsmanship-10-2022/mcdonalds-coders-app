import Card from '../Card/Card';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';
import Debit from './Debit';

const VALID_CARD_NUMBER = '1299999999999999';
const validCard = () => new Card(VALID_CARD_NUMBER, '12/24', 123);

describe('Given a Debit class', () => {
  it('should contain a pay method', () => {
    const card = validCard();
    const order = new Order(200);
    const donation = new Donation(0);
    const debit = new Debit(order, donation, card);
    expect(debit.pay).toBeInstanceOf(Function);
  });
});
