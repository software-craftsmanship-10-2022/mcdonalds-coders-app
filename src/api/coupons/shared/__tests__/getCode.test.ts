import {getCode} from '../couponUtils';

const RANDOM_STRING = 'ABC123DEF';
jest.mock('src/hooks/useRandom', () => jest.fn(() => RANDOM_STRING));

describe('given getCode', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const expectedOutput = 'ABC-123-DEF';

  test('when this function is called then expected result is returned', () => {
    const output = getCode();
    expect(output).toEqual(expectedOutput);
  });
});
