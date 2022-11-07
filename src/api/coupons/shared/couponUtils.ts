import useRandom from 'src/hooks/useRandom';

export function getDate() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
}

export function getCode() {
  const randomString = useRandom(9);
  return randomString.match(/.{1,3}/g)!.join('-');
}
