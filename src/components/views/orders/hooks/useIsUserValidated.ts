import {useState} from 'react';

type UseIsUserValidatedType = {
  isUserValidated: boolean;
  updateUserValidatedStatus: (isValid: boolean) => void;
};

const useIsUserValidated = (): UseIsUserValidatedType => {
  const [isValidated, setIsValidated] = useState(false);
  const updateUserValidatedStatus = (isValid: boolean): void => {
    setIsValidated(isValid);
  };

  return {
    isUserValidated: isValidated,
    updateUserValidatedStatus,
  };
};

export default useIsUserValidated;
