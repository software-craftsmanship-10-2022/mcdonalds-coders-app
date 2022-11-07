import {ACCOUNT_ERRORS} from '../../errorMessages';
import Account from './Account';

describe('Given an Account class', () => {
  it('should exist that class', () => {
    const account = new Account('john doe', 'SECTARB1XXX');
    expect(account).toBeInstanceOf(Object);
  });

  it('Should throw an error when fullName is not valid', () => {
    const account = new Account('john', 'SECTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });

  it('Should throw an error when swift has not 11 characters', () => {
    const account = new Account('john doe', 'SCTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.swiftValidation);
  });
});
