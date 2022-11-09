import {ACCOUNT_ERRORS, DONATION_ERRORS, ORDER_ERRORS} from '../../errorMessages';
import Account from '../Account/Account';
import Donation from '../Donation/Donation';
import Order from '../Order/Order';
import Transfer from './Transfer';

describe('Given a Transfer class', () => {
  it('should contain a pay method', () => {
    const account = new Account('1234432112344321', '12/24');
    const order = new Order(200);
    const donation = new Donation(0);
    const transfer = new Transfer(order, donation, account);
    expect(transfer.pay).toBeInstanceOf(Function);
  });

  it('should throw an error when order total amount is negative', () => {
    const order = new Order(-50);
    const donation = new Donation(0);
    const account = new Account('john doe', 'SECTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ORDER_ERRORS.over0Number);
  });

  it('should throw an error when order total amount is 0', () => {
    const order = new Order(0);
    const donation = new Donation(0);
    const account = new Account('john doe', 'SECTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ORDER_ERRORS.over0Number);
  });

  it('should throw an error when donation amount is negative', () => {
    const order = new Order(200);
    const donation = new Donation(-10);
    const account = new Account('john doe', 'SECTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(DONATION_ERRORS.positiveNumber);
  });

  it('should throw an error when account fullName is not valid', () => {
    const order = new Order(200);
    const donation = new Donation(0);
    const account = new Account('john', 'SECTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });

  it('when account SWIFT number is not valid then an error should be thrown', () => {
    const order = new Order(200);
    const donation = new Donation(1);
    const account = new Account('john doe', 'SCTARB1XXX');
    const transfer = new Transfer(order, donation, account);
    expect(() => {
      transfer.pay();
    }).toThrowError(ACCOUNT_ERRORS.swiftValidation);
  });
});
