import createEmptyOrder from 'src/api/orders/createEmptyOrder';
import Order from 'src/api/orders/Order';
import {clearAll, setItem} from 'src/utils/localStorage';
import {useOrderStorage} from './useOrderStorage';

const {storageOrderKey, storageStateKey, getOrder, setOrder, removeOrder} = useOrderStorage();

describe('Manipulate the Order object in cache system', () => {
  let order: Order;

  beforeEach(async () => {
    order = createEmptyOrder();
    await clearAll();
  });

  xit('sets the order in the cache system', async () => {
    await setOrder(order);
    const newOrder = await getOrder();
    console.log('🚀 ~ file: useOrderStorage.spec.ts ~ line 19 ~ it ~ newOrder', newOrder);
    expect(newOrder).toEqual(order);
  });

  it("tries to read the order when it wasn't created", async () => {
    expect(await getOrder()).toBe(undefined);
  });

  it('reads an object it is instance of Order', async () => {
    await setItem<Order>(storageOrderKey, order);
    expect(await getOrder()).toBeInstanceOf(Order);
  });

  it('removes the object from cache system', async () => {
    await setItem<Order>(storageOrderKey, order);
    await removeOrder();
    expect(await getOrder()).toBe(undefined);
  });
});
