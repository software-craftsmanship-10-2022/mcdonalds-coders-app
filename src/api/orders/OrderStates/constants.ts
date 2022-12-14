export const ORDER_STATES_CODES = {
  inProgressState: 'inProgressState',
  cancelledByRestaurantState: 'cancelledByRestaurantState',
  cancelledByUserState: 'cancelledByUserState',
  confirmedState: 'confirmedState',
  deliveringState: 'deliveringState',
  finishedState: 'finishedState',
  preparingState: 'preparingState',
  readyState: 'readyState',
  receivedState: 'receivedState',
  rejectedState: 'rejectedState',
};

const ORDER_STATES_DESCRIPTIONS = {
  inProgressState: 'En creación',
  cancelledByRestaurantState: 'Pedido cancelado por el restaurante',
  cancelledByUserState: 'Pedido cancelado',
  confirmedState: 'Pedido confirmado',
  deliveringState: 'Pedido en reparto',
  finishedState: 'Pedido finalizado',
  preparingState: 'Pedido en preparación',
  readyState: 'Pedido preparado',
  receivedState: 'Pedido recibido',
  rejectedState: 'Pedido rechazado',
};

export type OrderStateType = {
  code: string;
  description: string;
};

export const ORDER_STATES = {
  [ORDER_STATES_CODES.inProgressState]: {
    code: ORDER_STATES_CODES.inProgressState,
    description: ORDER_STATES_DESCRIPTIONS.inProgressState,
  },
  [ORDER_STATES_CODES.cancelledByRestaurantState]: {
    code: ORDER_STATES_CODES.cancelledByRestaurantState,
    description: ORDER_STATES_DESCRIPTIONS.cancelledByRestaurantState,
  },
  [ORDER_STATES_CODES.cancelledByUserState]: {
    code: ORDER_STATES_CODES.cancelledByUserState,
    description: ORDER_STATES_DESCRIPTIONS.cancelledByUserState,
  },
  [ORDER_STATES_CODES.confirmedState]: {
    code: ORDER_STATES_CODES.confirmedState,
    description: ORDER_STATES_DESCRIPTIONS.confirmedState,
  },
  [ORDER_STATES_CODES.deliveringState]: {
    code: ORDER_STATES_CODES.deliveringState,
    description: ORDER_STATES_DESCRIPTIONS.deliveringState,
  },
  [ORDER_STATES_CODES.finishedState]: {
    code: ORDER_STATES_CODES.finishedState,
    description: ORDER_STATES_DESCRIPTIONS.finishedState,
  },
  [ORDER_STATES_CODES.preparingState]: {
    code: ORDER_STATES_CODES.preparingState,
    description: ORDER_STATES_DESCRIPTIONS.preparingState,
  },
  [ORDER_STATES_CODES.readyState]: {
    code: ORDER_STATES_CODES.readyState,
    description: ORDER_STATES_DESCRIPTIONS.readyState,
  },
  [ORDER_STATES_CODES.receivedState]: {
    code: ORDER_STATES_CODES.receivedState,
    description: ORDER_STATES_DESCRIPTIONS.receivedState,
  },
  [ORDER_STATES_CODES.rejectedState]: {
    code: ORDER_STATES_CODES.rejectedState,
    description: ORDER_STATES_DESCRIPTIONS.rejectedState,
  },
};
