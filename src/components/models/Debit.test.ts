import {
  CARD_ERRORS,
  DONATION_ERRORS,
  ORDER_ERRORS,
} from "../../errorMessages";
import Card from "./Card";
import Debit from "./Debit";
import Donation from "./Donation";
import Order from "./Order";

describe("Given a Debit class", () => {
  it("should contain a pay method", () => {
    const card = new Card("1234432112344321", "12/24", 123);
    const order = new Order(200);
    const donation = new Donation(0);
    const debit = new Debit(order, donation, card);
    expect(debit.pay).toBeInstanceOf(Function);
  });

  it("should throw an error when order total amount is negative", () => {
    const order = new Order(-50);
    const donation = new Donation(0);
    const card = new Card("1234432112344321", "12/24", 123);
    const debit = new Debit(order, donation, card);
    expect(() => debit.pay()).toThrowError(ORDER_ERRORS.OVER_0_NUMBER);
  });

  it("should throw an error when order total amount is 0", () => {
    const order = new Order(0);
    const donation = new Donation(0);
    const card = new Card("1234432112344321", "12/24", 123);
    const debit = new Debit(order, donation, card);
    expect(() => debit.pay()).toThrowError(ORDER_ERRORS.OVER_0_NUMBER);
  });

  it("should throw an error when donation amount is negative", () => {
    const order = new Order(10);
    const donation = new Donation(-10);
    const card = new Card("1234432112344321", "12/24", 123);
    const debit = new Debit(order, donation, card);
    expect(() => debit.pay()).toThrowError(DONATION_ERRORS.POSITIVE_NUMBER);
  });

  it("should throw an error when card number is not valid", () => {
    const order = new Order(10);
    const donation = new Donation(-10);
    const card = new Card("231123132", "12/24", 123);
    const debit = new Debit(order, donation, card);
    expect(() => debit.pay()).toThrowError(CARD_ERRORS.WRONG_CARD_NUMBER);
  });

  it("should throw an error when card date is not valid", () => {
    const order = new Order(10);
    const donation = new Donation(-10);
    const card = new Card("1234432112344321", "13/24", 123);
    const debit = new Debit(order, donation, card);
    expect(() => debit.pay()).toThrowError(CARD_ERRORS.WRONG_DATE);
  });

  it("should throw an error when CVC number is not valid", () => {
    const order = new Order(10);
    const donation = new Donation(-10);
    const card = new Card("1234432112344321", "12/24", 12123);
    const debit = new Debit(order, donation, card);
    expect(() => debit.pay()).toThrowError(CARD_ERRORS.WRONG_CVC);
  });
});
