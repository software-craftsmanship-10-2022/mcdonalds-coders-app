import {DAYS_AS_THRESHOLD, getThirtyDaysLaterDate} from '../couponUtils';

describe('given getDate', () => {
  const ONE_DAY_IN_MILLISECONDS = 86400000;
  const THRESHOLD_IN_MILLISECONDS = DAYS_AS_THRESHOLD * ONE_DAY_IN_MILLISECONDS;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2000, 1, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('when function is called then expected future date should be returned with 30 days added', () => {
    const currentDate: Date = new Date();
    const oneMonthLaterDate: Date = getThirtyDaysLaterDate();

    const currentDateInMilliseconds: number = currentDate.getTime();
    const oneMonthLaterDateInMilliseconds: number = oneMonthLaterDate.getTime();

    expect(currentDateInMilliseconds + THRESHOLD_IN_MILLISECONDS).toEqual(
      oneMonthLaterDateInMilliseconds,
    );
  });
});
