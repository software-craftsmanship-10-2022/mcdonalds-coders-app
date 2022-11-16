import {DONATION_ERRORS} from '../../errorMessages';
import Donation from './Donation';

describe('Given a Donation class', () => {
  it('should contain a amountValue function', () => {
    const donation = new Donation(3);
    expect(donation.amountValue).toBeInstanceOf(Function);
  });
  it('when amount is not setted then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const donation = new Donation(undefined);
    expect(() => donation.amountValue()).toThrowError(DONATION_ERRORS.noDonationValue);
  });
  it('when amount is not a number then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const donation = new Donation('ddd');
    expect(() => donation.amountValue()).toThrowError(DONATION_ERRORS.donationAsNumber);
  });
  it('when amount is negative then an error should be thrown', () => {
    const donation = new Donation(-3);
    expect(() => donation.amountValue()).toThrowError(DONATION_ERRORS.positiveNumber);
  });
});
