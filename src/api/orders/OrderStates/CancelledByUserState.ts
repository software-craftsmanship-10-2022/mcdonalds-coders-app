import type Order from '../Order';
<<<<<<< HEAD
import {ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByUserState extends OrderState {
  constructor(order: Order) {
    super(order, ORDER_STATES.cancelledByUserState);
=======
import {MAPPED_ORDER_STATES} from './constants';
import OrderState from './OrderState';
class CancelledByUserState extends OrderState {
  constructor(order: Order) {
    super(order, MAPPED_ORDER_STATES.cancelledByUserState.code);
>>>>>>> aae9c3d (Squashed commit of the following:)
  }
}

export default CancelledByUserState;
