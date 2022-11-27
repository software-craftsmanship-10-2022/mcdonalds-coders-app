import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByUserState from '../CancelledByUserState';
import ConfirmedState from '../ConfirmedState';
import ReceivedState from '../ReceivedState';
import RejectedState from '../RejectedState';

describe('Given an In Received state', () => {
  let context: IStateContext;
  let receivedState: ReceivedState;
  let changeStateSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    context = new FakeStateContext();
    receivedState = new ReceivedState(context);
    changeStateSpy = jest.spyOn(context, 'changeState');
  });

  it('when nextStep is called then new state should be Confirmed state', () => {
    receivedState.nextStep();
    expect(changeStateSpy).toHaveBeenCalledWith(new ConfirmedState(context));
  });

  it('when cancelByUser is called then new state should be Cancelled by user state', () => {
    receivedState.cancelByUser();
    expect(changeStateSpy).toHaveBeenCalledWith(new CancelledByUserState(context));
  });

  it('when cancelByRestaurant is called then should return an Error', () => {
    expect(() => {
      receivedState.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when nextStep is called then new state should be Rejected state', () => {
    receivedState.reject();
    expect(changeStateSpy).toHaveBeenCalledWith(new RejectedState(context));
  });
});
