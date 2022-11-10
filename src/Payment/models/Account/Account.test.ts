import {ACCOUNT_ERRORS} from '../../errorMessages';
import Account from './Account';

describe('Given an Account class', () => {
  it('should exist that class', () => {
    const account = new Account('john doe', 'SECTARB1XXX');
    expect(account).toBeInstanceOf(Object);
  });
  it('when fullname is not valid then an error should be thrown', () => {
    const account = new Account('John', 'SECTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });

  it('when IBAN number is not valid then an error should be thrown', () => {
    const account = new Account('john doe', 'SCTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.ibanFormat);
  });
});
