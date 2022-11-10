import {ACCOUNT_ERRORS, DONATION_ERRORS, ORDER_ERRORS} from '../../errorMessages';
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

  it('when order total amount is negative then an error should be thrown', () => {
    const order = new Order(-50);
    const donation = new Donation(0);
    const account = validAccount();
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ORDER_ERRORS.over0Number);
  });

  it('when order total amount is 0 then an error should be thrown', () => {
    const order = new Order(0);
    const donation = new Donation(0);
    const account = validAccount();
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ORDER_ERRORS.over0Number);
  });

  it('when donation amount is negative then an error should be thrown', () => {
    const order = new Order(200);
    const donation = new Donation(-10);
    const account = validAccount();
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(DONATION_ERRORS.positiveNumber);
  });

  it('when account fullName is not valid then an error should be thrown', () => {
    const order = new Order(200);
    const donation = new Donation(0);
    const account = new Account('john', 'SECTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });

  it('when account IBAN number is not valid then an error should be thrown', () => {
    const order = new Order(200);
    const donation = new Donation(1);
    const account = new Account('john doe', 'SCTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ACCOUNT_ERRORS.ibanFormat);
  });
});
