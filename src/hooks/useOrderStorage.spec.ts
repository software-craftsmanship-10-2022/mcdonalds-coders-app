import createEmptyOrder from 'src/api/orders/createEmptyOrder';
import Order from 'src/api/orders/Order';
import {clearAll, getItem, setItem} from 'src/utils/localStorage';
import {useOrderStorage} from './useOrderStorage';

const {storageOrderKey, storageStateKey, getOrder, setOrder, removeOrder} = useOrderStorage();

describe('Manipulate the Order object in cache system', () => {
  let order: Order;

  beforeEach(async () => {
    order = createEmptyOrder();
    await clearAll();
  });

  it('writes the order in the cache system', async () => {
    await setOrder(order);
    expect(await getItem<Order>(storageOrderKey)).toEqual(order);
  });

  it("tries to read the order when it wasn't created", async () => {
    expect(await getOrder()).toBe(undefined);
  });

  it('reads an object it is instance of Order', async () => {
    await setItem<Order>(storageOrderKey, order);
    expect(await getOrder()).toBeInstanceOf(Order);
  });

  it('checks the object in cache system is an Order instance.', async () => {
    await setItem<Order>(storageOrderKey, order);
    expect(await getOrder()).toEqual(order);
  });

  it('removes the object from cache system', async () => {
    await setItem<Order>(storageOrderKey, order);
    await removeOrder();
    expect(await getOrder()).toBe(undefined);
  });
});
