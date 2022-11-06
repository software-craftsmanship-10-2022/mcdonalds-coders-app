import Donation from "./Donation";

describe("Given a Donation class", () => {
  it("should contain a amountValue function", () => {
    const donation = new Donation(3);
    expect(donation.amountValue).toBeInstanceOf(Function);
  });
  it("amountValue should should be a positive number", () => {
    const donation = new Donation(-3);
    expect(() => donation.amountValue()).toThrowError(
      "Amount must be a positive number"
    );
  });
});
