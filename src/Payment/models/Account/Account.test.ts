import {ACCOUNT_ERRORS} from '../../errorMessages';
import Account from './Account';

describe('Given an Account class', () => {
  it('should exist that class', () => {
    const account = new Account('john doe', 'SECTARB1XXX');
    expect(account).toBeInstanceOf(Object);
  });
  it('when fullname is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const account = new Account(undefined, 'SECTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });
  it('when fullname is not string then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const account = new Account(4342, 'SECTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });
  it('when fullname is not valid then an error should be thrown', () => {
    const account = new Account('John', 'SECTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.fullNameFormat);
  });
  it('when IBAN number is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const account = new Account('john doe', undefined);
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.ibanFormat);
  });
  it('when IBAN number is not valid then an error should be thrown', () => {
    const account = new Account('john doe', 'SCTARB1XXX');
    expect(() => account.isValid()).toThrowError(ACCOUNT_ERRORS.ibanFormat);
  });
});
