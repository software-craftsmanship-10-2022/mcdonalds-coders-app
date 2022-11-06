import Order from "./Order";

describe("Given a Order class", () => {
  it("should contain a amountValue function", () => {
    const order = new Order(44);
    expect(order.totalAmount).toBeInstanceOf(Function);
  });
  it("total amount should be a positive number", () => {
    const order = new Order(-50);
    expect(() => order.totalAmount()).toThrowError(
      "Order amount must be greater than 0"
    );
  });
  it("total amount should be greater than 0", () => {
    const order = new Order(0);
    expect(() => order.totalAmount()).toThrowError(
      "Order amount must be greater than 0"
    );
  });
});
