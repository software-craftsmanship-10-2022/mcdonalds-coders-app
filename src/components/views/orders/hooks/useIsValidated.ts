import {useState} from 'react';

type UseIsValidatedType = {
  isUserValidated: boolean;
  updateUserValidatedStatus: (isValid: boolean) => void;
};

const useIsValidatedType = (): UseIsValidatedType => {
  const [isValidated, setIsValidated] = useState(false);
  const updateUserValidatedStatus = (isValid: boolean): void => {
    setIsValidated(isValid);
  };

  return {
    isUserValidated: isValidated,
    updateUserValidatedStatus,
  };
};

export default useIsValidatedType;
