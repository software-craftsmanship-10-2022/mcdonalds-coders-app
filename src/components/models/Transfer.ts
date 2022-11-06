import Account from "./Account";
import Donation from "./Donation";
import Order from "./Order";
import Payment from "./Payment";

class Transfer extends Payment {
  account: Account;

  constructor(order: Order, donation: Donation, account: Account) {
    super(order, donation);
    this.account = account;
  }

  pay() {
    super.pay();
    this.account.isValid();

    // TODO pay cash
    this.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Transfer;
