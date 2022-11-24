import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByRestaurantState from '../CancelledByRestaurantState';
import DeliveringState from '../DeliveringState';
import ReadyState from '../ReadyState';

describe('Given an Ready state', () => {
  let context: IStateContext;
  let readyState: ReadyState;
  let changeStateSpy: jest.SpyInstance;

  beforeEach(() => {
    context = new FakeStateContext();
    readyState = new ReadyState(context);
    changeStateSpy = jest.spyOn(context, 'changeState');
  });

  it('when nextStep is called then new state should be Delivering state', () => {
    readyState.nextStep();
    expect(changeStateSpy).toHaveBeenCalledWith(new DeliveringState(context));
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      readyState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then new state should be Cancelled By Restaurant state', () => {
    readyState.cancelByRestaurant();
    expect(changeStateSpy).toHaveBeenCalledWith(new CancelledByRestaurantState(context));
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      readyState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
