import {DONATION_ERRORS} from '../../errorMessages';

class Donation {
  constructor(private readonly amount: number) {}

  checkAmountValue() {
    if (this.amount === undefined || this.amount === null)
      throw new Error(DONATION_ERRORS.noDonationValue);
    if (typeof this.amount !== 'number') throw new Error(DONATION_ERRORS.donationAsNumber);
    if (this.amount < 0) throw new Error(DONATION_ERRORS.positiveNumber);
  }

  amountValue(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Donation;
