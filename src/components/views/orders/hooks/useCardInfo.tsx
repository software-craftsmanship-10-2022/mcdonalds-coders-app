import {useState} from 'react';

const useCardInfo = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const cardData = {
    number: cardNumber,
    date: cardDate,
    cvc: cardCVC,
  };

  const cardUpdate = {
    number(cardNumber: string) {
      setCardNumber(cardNumber);
    },
    date(cardDate: string) {
      setCardDate(cardDate);
    },
    cvc(cardCVC: string) {
      setCardCVC(cardCVC);
    },
  };

  return {
    cardData,
    cardUpdate,
  };
};

export default useCardInfo;
