import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import DeliveringState from '../DeliveringState';
import FinishedState from '../FinishedState';

describe('Given an Delivering state', () => {
  let context: IStateContext;
  let deliverinState: DeliveringState;
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
    deliverinState = new DeliveringState(context);
    changeStateSpy = jest.spyOn(context, 'changeState');
  });

  it('when nextStep is called then new state should be Finished state', () => {
    deliverinState.nextStep();
    expect(changeStateSpy).toHaveBeenCalledWith(new FinishedState(context));
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      deliverinState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then new state should be Cancelled By Restaurant state', () => {
    deliverinState.cancelByRestaurant();
    expect(changeStateSpy).toHaveBeenCalledWith(new CancelledByRestaurantState(context));
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      deliverinState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
