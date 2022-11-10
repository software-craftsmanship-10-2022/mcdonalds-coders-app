import {CARD_ERRORS} from '../../errorMessages';
import Card from './Card';

describe('Given a Card class', () => {
  it('should contain the isValid method', () => {
    const card = new Card('231123132', '12/23', 123);
    expect(card.isValid).toBeInstanceOf(Function);
  });

  it('when length is not valid then an error should be thrown', () => {
    const card = new Card('231123132', '12/23', 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCardNumber);
  });

  it('when date is not valid then an error should be thrown', () => {
    const card = new Card('1299999999999999', '13/23', 123);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongDate);
  });

  it('when cvc is not valid then an error should be thrown', () => {
    const card = new Card('1299999999999999', '12/23', 1223);

    expect(() => card.isValid()).toThrowError(CARD_ERRORS.wrongCvc);
  });
});
