import {DONATION_ERRORS} from '../../errorMessages';
import Donation from './Donation';

describe('Given a Donation class', () => {
  it('should contain a amountValue function', () => {
    const donation = new Donation(3);
    expect(donation.amountValue).toBeInstanceOf(Function);
  });
  it('should throw an error when amount is negative', () => {
    const donation = new Donation(-3);
    expect(() => donation.amountValue()).toThrowError(DONATION_ERRORS.positiveNumber);
  });
});
