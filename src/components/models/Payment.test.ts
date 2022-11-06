import Donation from "./Donation";
import Order from "./Order";
import Payment from "./Payment";

describe("Given a Payment class", () => {
  it("Should contain a pay method", () => {
    const payment = new Payment(new Order(45), new Donation(0));
    expect(payment.pay).toBeInstanceOf(Function);
  });
});
