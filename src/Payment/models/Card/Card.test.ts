import {CARD_ERRORS} from '../../errorMessages';
import Card from './Card';

const VALID_CARD_NUMBER = '1299999999999999';

describe('Given a Card class', () => {
  it('should contain the isValid method', () => {
    const card = new Card('231123132', '12 / 23', 123);
    expect(card.isValid).toBeInstanceOf(Function);
  });

  it('when card number is not set then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const card = new Card(undefined, '12 / 23', 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCardNumber);
  });

  it('when card number length is not valid then an error should be thrown', () => {
    const card = new Card('231123132', '12 / 23', 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCardNumber);
  });

  it('when card number is not a string then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const card = new Card(1123132, '12 / 23', 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCardNumber);
  });

  it('when date is not set then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const card = new Card(VALID_CARD_NUMBER, undefined, 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.dateEmpty);
  });

  it('when date is not a string then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const card = new Card(VALID_CARD_NUMBER, 3243, 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongDate);
  });

  it('when date is not valid then an error should be thrown', () => {

    const card = new Card(VALID_CARD_NUMBER, '13 / 23', 123);


    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongDate);
  });

  it('when cvc is not set then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const card = new Card(VALID_CARD_NUMBER, '12/23', undefined);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCvc);
  });

  it('when cvc is not a number set then an error should be thrown', () => {
    // @ts-expect-error desactivamos ts para forzar el test
    const card = new Card(VALID_CARD_NUMBER, '12/23', 'aaa');

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.cvcAsNumber);
  });

  it('when cvc is not valid then an error should be thrown', () => {
    const card = new Card(VALID_CARD_NUMBER, '12 / 23', 1223);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCvc);
  });
});
