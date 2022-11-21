export type OrderRepository = {
  save: (orderId: string) => Promise<void>;
};
