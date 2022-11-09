import {createEmptyOrder, Order} from 'src/api/orders/Orders';
import {clearAll, getItem, setItem} from 'src/utils/localStorage';
import {useOrderStorage} from './useOrderStorage';

const {storageKey, getOrder, setOrder, removeOrder} = useOrderStorage();

describe('Manipulate the Order object in cache system', () => {
  let order: Order;

  beforeEach(async () => {
    order = createEmptyOrder();
    await clearAll();
  });

  it('writes the order in the cache system', async () => {
    await setOrder(order);
    expect(await getItem<Order>(storageKey)).toEqual(order);
  });

  it("tries to read the order when it wasn't created", async () => {
    expect(await getOrder()).toBe(undefined);
  });

  it('reads an object it is instance of Order', async () => {
    await setItem<Order>(storageKey, order);
    expect(await getOrder()).toBeInstanceOf(Order);
  });

  it('checks the object in cache system is an Order instance.', async () => {
    await setItem<Order>(storageKey, order);
    expect(await getOrder()).toEqual(order);
  });

  it('removes the object from cache system', async () => {
    await setItem<Order>(storageKey, order);
    await removeOrder();
    expect(await getOrder()).toBe(undefined);
  });
});
