import {FAKE_STATE, METHOD_NOT_IMPLEMENTED_ERROR, TEST_STATES} from '../constants';
import {FakeStateContext} from '../FakeStateContext';
import {default as FakeTestState} from '../FakeTestState';
import type {IStateContext} from '../IStateContext';

describe('Given a McState abstract class', () => {
  let context: IStateContext;

  beforeEach(() => {
    context = new FakeStateContext();
  });

  it('when an State is created method getCode() should return first step code', () => {
    const state = new FakeTestState(context);
    expect(state.getCode()).toBe(TEST_STATES[FAKE_STATE].code);
  });

  it('when an State is created method getDescription() should return first step description', () => {
    const state = new FakeTestState(context);
    expect(state.getDescription()).toBe(TEST_STATES[FAKE_STATE].description);
  });

  it('when an State is created method nextStep()) should return an Error', () => {
    const state = new FakeTestState(context);
    expect(() => {
      state.nextStep();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when an State is created method cancelByUser()) should return an Error', () => {
    const state = new FakeTestState(context);
    expect(() => {
      state.cancelByUser();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when an State is created method cancelByRestaurant()) should return an Error', () => {
    const state = new FakeTestState(context);
    expect(() => {
      state.cancelByRestaurant();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });

  it('when an State is created method reject()) should return an Error', () => {
    const state = new FakeTestState(context);
    expect(() => {
      state.reject();
    }).toThrow(METHOD_NOT_IMPLEMENTED_ERROR);
  });
});
