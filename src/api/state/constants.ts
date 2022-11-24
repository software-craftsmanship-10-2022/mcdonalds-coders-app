export type TestStateType = {
  code: string;
  description: string;
};

export const FAKE_STATE = 'fakeStep';

export const TEST_STATES = {
  [FAKE_STATE]: {
    code: FAKE_STATE,
    description: FAKE_STATE,
  },
};

export const METHOD_NOT_IMPLEMENTED_ERROR = 'Method not implemented.';
