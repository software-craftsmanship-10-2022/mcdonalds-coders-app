import {DIGITS} from '../config';

const shuffleArray = (array: string[]) => {
  const result = array;
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

// Generate a random alphanumeric string of n length
const useRandom = (length: number) => {
  const digitsShuffled = shuffleArray(DIGITS);
  let string = '';

  for (let i = 0; i < length; i++) {
    string += digitsShuffled[getRandomInt(DIGITS.length)];
  }

  return string;
};

export default useRandom;
