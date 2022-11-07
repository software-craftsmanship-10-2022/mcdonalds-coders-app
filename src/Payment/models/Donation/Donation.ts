import { DONATION_ERRORS } from "../../errorMessages";

class Donation {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  checkAmountValue() {
    if (this.amount < 0) throw new Error(DONATION_ERRORS.POSITIVE_NUMBER);
  }
  amountValue(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Donation;
