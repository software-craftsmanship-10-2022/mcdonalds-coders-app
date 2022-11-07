import { DONATION_ERRORS, ORDER_ERRORS } from "../../errorMessages";
import Donation from "../Donation/Donation";
import Order from "../Order/Order";
import Cash from "./Cash";

describe("Given a Cash class", () => {
  it("should contain a pay method", () => {
    const order = new Order(200);
    const donation = new Donation(0);
    const cash = new Cash(order, donation);
    expect(cash.pay).toBeInstanceOf(Function);
  });

  it("should throw an error when order total amount is negative", () => {
    const order = new Order(-50);
    const donation = new Donation(0);
    const cash = new Cash(order, donation);
    expect(() => cash.pay()).toThrowError(ORDER_ERRORS.OVER_0_NUMBER);
  });

  it("should throw an error when order total amount is 0", () => {
    const order = new Order(0);
    const donation = new Donation(0);
    const cash = new Cash(order, donation);
    expect(() => cash.pay()).toThrowError(ORDER_ERRORS.OVER_0_NUMBER);
  });

  it("should throw an error when donation amount is negative", () => {
    const order = new Order(10);
    const donation = new Donation(-10);
    const cash = new Cash(order, donation);
    expect(() => cash.pay()).toThrowError(DONATION_ERRORS.POSITIVE_NUMBER);
  });
});
