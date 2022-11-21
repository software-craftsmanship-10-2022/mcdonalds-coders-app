export class PaymentAmount {
  #amount: number;
  #donation: number;
  #voucher: number;

  constructor(amount: number, donation: number, voucher: number) {
    this.#amount = amount;
    this.#donation = donation;
    this.#voucher = voucher;
  }

  totalAmount() {
    return this.#amount + this.#donation - this.#voucher;
  }
}
