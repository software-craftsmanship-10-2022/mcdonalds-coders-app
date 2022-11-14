import {useState} from 'react';

type UseIsCardValidType = {
  isCardValid: boolean;
  updateCardValidity: (isValid: boolean) => void;
};

const useIsCardValid = (): UseIsCardValidType => {
  const [isCardValid, setIsCardValid] = useState(false);

  const updateCardValidity = (isValid: boolean) => {
    setIsCardValid(isValid);
  };

  return {
    isCardValid,
    updateCardValidity,
  };
};

export default useIsCardValid;
