import DISCOUNTS from "src/data/discounts";
import getDiscounts from "../get-discounts";
import { MOCK_DISCOUNTS } from "./mocks";

describe("given a coupons request", () => {
afterEach(() => {
    jest.restoreAllMocks();
  });

  test("when promise is resolved then a list of discounts should be returned", async () => {
     globalThis.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => MOCK_DISCOUNTS,
      });
    }) as jest.Mock;

    const discounts = await getDiscounts();

    expect(discounts).toBeInstanceOf(Array);
    expect(discounts).toEqual(DISCOUNTS);
    expect(discounts.length).toBeTruthy();
  });

  test('when promise is rejected then expected info error and discounts as empty array is returned', async() => {
    const EXPECTED_REJECTED_RESULT = {
       discounts: [],
       error: { message: "API failure", name: "Error" },
    };

    jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("API failure"));

    const response = await getDiscounts()
    expect(response).toEqual(EXPECTED_REJECTED_RESULT)
  })
})
