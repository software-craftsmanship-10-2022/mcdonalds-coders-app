import Payment from '../Payment/Payment';

class Cash extends Payment {
  pay() {
    super.pay();

    // TODO pay cash
    this.order.totalAmount();
    this.donation.amountValue();
  }
}

export default Cash;
