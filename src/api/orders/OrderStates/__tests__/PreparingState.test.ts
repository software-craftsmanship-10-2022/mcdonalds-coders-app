import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import PreparingState from '../PreparingState';
import ReadyState from '../ReadyState';

describe('Given an Preparing state', () => {
  let context: IStateContext;
  let preparingState: PreparingState;
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
    preparingState = new PreparingState(context);
    changeStateSpy = jest.spyOn(context, 'changeState');
  });

  it('when nextStep is called then new state should be Ready state', () => {
    preparingState.nextStep();
    expect(changeStateSpy).toHaveBeenCalledWith(new ReadyState(context));
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      preparingState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then new state should be Cancelled By Restaurant state', () => {
    preparingState.cancelByRestaurant();
    expect(changeStateSpy).toHaveBeenCalledWith(new CancelledByRestaurantState(context));
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      preparingState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
