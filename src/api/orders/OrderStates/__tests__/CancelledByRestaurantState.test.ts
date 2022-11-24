import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByRestaurantState from '../CancelledByRestaurantState';

describe('Given an Cancelled by Restaurant state', () => {
  let context: IStateContext;
  let cancelledByRestaurantState: CancelledByRestaurantState;

  beforeEach(() => {
    context = new FakeStateContext();
    cancelledByRestaurantState = new CancelledByRestaurantState(context);
  });

  it('when nextStep is called then should return an Error', () => {
    expect(() => {
      cancelledByRestaurantState.nextStep();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      cancelledByRestaurantState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then should return an Error', () => {
    expect(() => {
      cancelledByRestaurantState.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      cancelledByRestaurantState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
