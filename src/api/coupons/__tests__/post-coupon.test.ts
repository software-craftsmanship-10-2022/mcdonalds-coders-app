import createCoupon from '../operations/post-coupon';

describe('given a discount category and an item id', () => {
  test('when category is not defined then an TypeError is thrown', async () => {
    try {
      await createCoupon({category: undefined});
    } catch (error: Error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('TypeError');
      expect(error.message).toBe('Discount category is not defined');
    }
  });

  test('when id is not defined then an TypeError is thrown', async () => {
    try {
      await createCoupon({category: 'burger'});
    } catch (error: Error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('TypeError');
      expect(error.message).toBe('Item id is not defined');
    }
  });
});
