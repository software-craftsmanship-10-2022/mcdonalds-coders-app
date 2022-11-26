import type {Voucher} from '../Voucher/Voucher';

export class PaymentAmount {
  #amount: number;
  #donation: number;
  #voucher: Voucher | undefined;

  constructor(amount: number, donation: number, voucher: Voucher | undefined) {
    this.#amount = amount;
    this.#donation = donation;
    this.#voucher = voucher;
  }

  totalAmount() {
    if (this.#voucher) {
      return this.#voucher.useDiscount(this.#amount) + this.#donation;
    }

    return this.#amount + this.#donation;
  }
}
