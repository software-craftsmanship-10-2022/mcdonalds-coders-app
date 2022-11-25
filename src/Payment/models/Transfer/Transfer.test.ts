import Account from '../Account/Account';
import {TransferPaymentStrategy} from './Transfer';

const VALID_IBAN = 'ES5821033533818210523408';

const validAccount = () => new Account('john doe', VALID_IBAN);

describe('Given a TransferPaymentStrategy class', () => {
  it('when an instance is created then pay method should be defined', () => {
    const transfer = new TransferPaymentStrategy(validAccount());
    expect(transfer.pay).toBeInstanceOf(Function);
  });
});
