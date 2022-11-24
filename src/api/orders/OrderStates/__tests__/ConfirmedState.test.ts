import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import CancelledByUserState from '../CancelledByUserState';
import ConfirmedState from '../ConfirmedState';
import PreparingState from '../PreparingState';

describe('Given an Confirmed state', () => {
  let context: IStateContext;
  let confirmedState: ConfirmedState;
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
    confirmedState = new ConfirmedState(context);
    changeStateSpy = jest.spyOn(context, 'changeState');
  });

  it('when nextStep is called then new state should be Preparing state', () => {
    confirmedState.nextStep();
    expect(changeStateSpy).toHaveBeenCalledWith(new PreparingState(context));
  });

  it('when cancelByUser is called then new state should be Cancelled By User state', () => {
    confirmedState.cancelByUser();
    expect(changeStateSpy).toHaveBeenCalledWith(new CancelledByUserState(context));
  });

  it('when cancelByRestaurant is called then new state should be Cancelled By Restaurant state', () => {
    confirmedState.cancelByRestaurant();
    expect(changeStateSpy).toHaveBeenCalledWith(new CancelledByRestaurantState(context));
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      confirmedState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
