import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import CancelledByUserState from '../CancelledByUserState';

describe('Given an Cancelled by user state', () => {
  let context: IStateContext;
  let cancelledByUserState: CancelledByUserState;

  beforeEach(() => {
    context = new FakeStateContext();
    cancelledByUserState = new CancelledByUserState(context);
  });

  it('when nextStep is called then should return an Error', () => {
    expect(() => {
      cancelledByUserState.nextStep();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      cancelledByUserState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then should return an Error', () => {
    expect(() => {
      cancelledByUserState.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      cancelledByUserState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
