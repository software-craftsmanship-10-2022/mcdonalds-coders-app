import Order from './Order';

export const ERROR_INVALID_PARAM = 'The first param is not Order type.';

export const idGenerator = {
  generate() {
    return (Math.random() + 1).toString(36).substring(7);
  },
};

/**
 * Save the `order` order in the backend.
 *
 * @return Order modified from backend. (It includes the id assigned by backend system
 */
export default async function saveOrder(order: Order): Promise<Order> {
  if (!(order instanceof Order)) {
    throw new TypeError(ERROR_INVALID_PARAM);
  }

  // Simulate saving and the fetching of a new id from backend.
  const newOrder = order.clone();
  newOrder.setId(idGenerator.generate());
  return newOrder;
}
