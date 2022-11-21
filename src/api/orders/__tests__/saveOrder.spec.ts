import createEmptyOrder from '../createEmptyOrder';
import type Order from '../Order';
import saveOrder, {ERROR_INVALID_PARAM, idGenerator} from '../saveOrder';

describe('Test `saveOrder` function', () => {
  const dummyId = 'dummy123';
  let order: Order;
  let spyGenerator: jest.SpiedFunction<typeof idGenerator.generate>;

  beforeEach(() => {
    order = createEmptyOrder();
    spyGenerator = jest.spyOn(idGenerator, 'generate');
    spyGenerator.mockReturnValue(dummyId);
  });

  afterEach(() => {
    spyGenerator.mockRestore();
  });

  it('checks the function throws an error if the paramater is not Order type', async () => {
    expect.assertions(2);
    try {
      await saveOrder(undefined as unknown as Order);
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
      expect(error).toEqual(new TypeError(ERROR_INVALID_PARAM));
    }
  });

  it('checks returns Order instance', async () => {
    const newOrder = await saveOrder(order);
    order.setId(dummyId); // Replace the default id by the id generated when it saves the order.

    expect(order).toEqual(newOrder);
  });
});
