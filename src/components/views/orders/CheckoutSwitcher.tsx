import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {OrderStatus} from 'src/@types/order';
import saveOrder from 'src/api/orders/saveOrder';
import {useOrderContext} from 'src/context/OrderContext';
import useLocalStorage from 'src/hooks/useLocalStorage';
// Import type Order from 'src/Payment/models/Order/Order';
import type Order from 'src/api/orders/Order';
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
    if (order.isItemsEmpty()) {
      navigate(URLS.root);
    }

    // @TODO refactor localstorage
    const user = getStorageItem(STORAGE.users); // eslint-disable-line
    if (user) {
      updateUserValidatedStatus(true);
    }
  }, [order, navigate, getStorageItem]);

  const confirmOrder = async (payment: Payment, order: Order) => {
    order.setStatus(OrderStatus.pending);
    order.setPayment(payment.getPaymentType());
    updateOrder(await saveOrder(order));
    payment.pay();
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
