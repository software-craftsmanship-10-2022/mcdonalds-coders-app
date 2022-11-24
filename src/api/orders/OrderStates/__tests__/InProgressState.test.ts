import {METHOD_NOT_IMPLEMENTED_ERROR} from 'src/api/state/constants';
import {FakeStateContext} from 'src/api/state/FakeStateContext';
import type {IStateContext} from 'src/api/state/IStateContext';
import InProgressState from '../InProgressState';
import ReceivedState from '../ReceivedState';

describe('Given an In Progress state', () => {
  let context: IStateContext;
  let inProgressState: InProgressState;
  let changeStateSpy: jest.SpyInstance;

  beforeEach(() => {
    context = new FakeStateContext();
    inProgressState = new InProgressState(context);
    changeStateSpy = jest.spyOn(context, 'changeState');
  });

  it('when nextStep is called then new state should be Received state', () => {
    inProgressState.nextStep();
    expect(changeStateSpy).toHaveBeenCalledWith(new ReceivedState(context));
  });

  it('when cancelByUser is called then should return an Error', () => {
    expect(() => {
      inProgressState.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when cancelByRestaurant is called then should return an Error', () => {
    expect(() => {
      inProgressState.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when reject is called then should return an Error', () => {
    expect(() => {
      inProgressState.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
