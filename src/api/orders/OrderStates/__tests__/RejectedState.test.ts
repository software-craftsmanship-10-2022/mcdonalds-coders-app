import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import RejectedState from '../RejectedState';

describe('Given an Rejected state', () => {
  let context: IStateContext;
  let rejectedState: RejectedState;

  beforeEach(() => {
    context = new FakeStateContext();
    rejectedState = new RejectedState(context);
  });

  it('when nextStep is called then should return an Error', () => {
    expect(() => {
      rejectedState.nextStep();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      rejectedState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then should return an Error', () => {
    expect(() => {
      rejectedState.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      rejectedState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
