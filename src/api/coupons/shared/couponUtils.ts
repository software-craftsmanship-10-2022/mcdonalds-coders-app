import useRandom from 'src/hooks/useRandom';

export const DAYS_AS_THRESHOLD = 30;

export function getDate() {
  const date = new Date();
  date.setDate(date.getDate() + DAYS_AS_THRESHOLD);
  return date;
}

export function getCode() {
  const randomString = useRandom(9);
  return randomString.match(/.{1,3}/g)!.join('-');
}
