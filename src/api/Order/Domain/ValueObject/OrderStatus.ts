/* eslint-disable @typescript-eslint/member-ordering */
import InvalidArgumentException from '~api/Shared/Domain/Exception/InvalidArgumentException';

enum STATUS {
  pending = 'PENDING',
  preparing = 'PREPARING',
  delivered = 'DELIVERED',
}

export default class OrderStatus {
  validStatus = [STATUS.pending, STATUS.preparing, STATUS.delivered];

  constructor(private readonly status: string) {
    this.checkIsValidStatus(status);
    this.status = status;
  }

  public static fromPending(): OrderStatus {
    return new OrderStatus(STATUS.pending);
  }

  public static fromPreparing(): OrderStatus {
    return new OrderStatus(STATUS.preparing);
  }

  public static fromDelivered(): OrderStatus {
    return new OrderStatus(STATUS.delivered);
  }

  private checkIsValidStatus(status: string): void {
    if (Object.values(STATUS).includes(status as STATUS)) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal, @typescript-eslint/no-unsafe-call
      throw new InvalidArgumentException(`error`);
    }
  }
}
