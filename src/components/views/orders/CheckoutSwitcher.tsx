import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useOrderContext} from 'src/context/OrderContext';
import useLocalStorage from 'src/hooks/useLocalStorage';
import type Payment from 'src/Payment/models/Payment/Payment';
import {STORAGE, URLS} from '../../../config';
import UserForm from '../../form/UserForm';
import Checkout from './Checkout';
import './Checkout.css';
import {useIsUserValidated} from './hooks';

const CheckoutSwitcher = () => {
  const navigate = useNavigate();
  // User validation check
  const {isUserValidated, updateUserValidatedStatus} = useIsUserValidated();

  const {order, updateOrder} = useOrderContext();
  const {getStorageItem} = useLocalStorage();

  useEffect(() => {
    // Exit if there is no order in the state
    if (order.items.length <= 0) {
      navigate(URLS.root);
    }

    // @TODO refactor localstorage
    const user = getStorageItem(STORAGE.users); // eslint-disable-line
    if (user) {
      updateUserValidatedStatus(true);
    }
  }, [order, navigate, getStorageItem]);

  const confirmOrder = (payment: Payment, selectedMethod: string) => {
    updateOrder({...order, confirmed: true, paymentType: selectedMethod});
    console.log(payment);
    payment.pay();
    // Console.log(details);
    navigate(URLS.root);
  };

  return (
    <div className="Checkout">
      {!isUserValidated && <UserForm setIsValidated={updateUserValidatedStatus} />}
      {isUserValidated && <Checkout order={order} confirmOrder={confirmOrder} />}
    </div>
  );
};

export default CheckoutSwitcher;