import {useState} from 'react';

export type CardDataType = {
  number: string;
  date: string;
  cvc: string;
};

type CardUpdateType = {
  number: (cardNumber: string) => void;
  date: (cardDate: string) => void;
  cvc: (cardCVC: string) => void;
};
const useCardInfo = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const cardData: CardDataType = {
    number: cardNumber,
    date: cardDate,
    cvc: cardCVC,
  };

  const cardUpdate: CardUpdateType = {
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
