const POSITIVE_ERROR = "Amount must be a positive number";

class Donation {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  checkAmountValue() {
    if (this.amount < 0) throw new Error(POSITIVE_ERROR);
  }
  amountValue(): number {
    this.checkAmountValue();
    return this.amount;
  }
}

export default Donation;
