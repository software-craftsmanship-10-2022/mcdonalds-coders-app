import {useState} from 'react';

type UsePaymentMethodType = {
  paymentMethod: string;
  updatePaymentMethod: (type: string) => void;
};
const usePaymentMethod = (defaultType: string): UsePaymentMethodType => {
  const [paymentMethod, setPaymentMethod] = useState(defaultType);

  const updatePaymentMethod = (type: string) => {
    setPaymentMethod(type);
  };

  return {
    paymentMethod,
    updatePaymentMethod,
  };
};

export default usePaymentMethod;
