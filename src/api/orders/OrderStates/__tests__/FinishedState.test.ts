import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import FinishedState from '../FinishedState';

describe('Given an Finished state', () => {
  let context: IStateContext;
  let finishedState: FinishedState;

  beforeEach(() => {
    context = new FakeStateContext();
    finishedState = new FinishedState(context);
  });

  it('when nextStep is called then should return an Error', () => {
    expect(() => {
      finishedState.nextStep();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      finishedState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then should return an Error', () => {
    expect(() => {
      finishedState.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      finishedState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
