import Account from '../Account/Account';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';
import Transfer from './Transfer';

const VALID_IBAN = 'ES5821033533818210523408';

const validAccount = () => new Account('john doe', VALID_IBAN);

describe('Given a Transfer class', () => {
  it('when an instance is created then pay method should be defined', () => {
    const account = validAccount();
    const order = new Order(200);
    const donation = new Donation(0);
    const transfer = new Transfer(order, donation, account);
    expect(transfer.pay).toBeInstanceOf(Function);
  });
});
