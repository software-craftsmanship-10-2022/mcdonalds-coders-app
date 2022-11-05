import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import type { OrderType } from "../../../@types/order";
import { PAYMENT_TYPE, STORAGE, URLS } from "../../../config";
import { useOrderContext } from "../../../context/OrderContext";
import useFormat from "../../../hooks/useFormat";
import useLocalStorage from "../../../hooks/useLocalStorage";
import McButton from "../../buttons/McButton";
import PaymentInputs from "../../form/PaymentInputs";
import UserForm from "../../form/UserForm";
import InfoModal from "../../modal/InfoModal";
import "./Checkout.css";

type CardDetailsType = {
  number: string;
  date: string;
  cvc: string;
};

type DetailProps = {
  order: OrderType;
  confirmOrder: (payMethod: string, details: CardDetailsType) => void;
};

const Detail = ({ order, confirmOrder }: DetailProps) => {
  const addressTitle = order.details.isDelivery
    ? "Domicilio"
    : "Dirección de retiro en el local";
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_TYPE.CASH);
  const [currencyFormatter] = useFormat();
  // Card information
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  // Card validation check
  const [cardIsValid, setCardIsValid] = useState(false);

  // Warning modal
  const [modalMessage, setModalMessage] = useState("");
  const toggleModal = () => { setShowModal(!showModal); };
  const [showModal, setShowModal] = useState(false);

  const handleCardWarning = (message: string) => {
    setModalMessage(message);
    toggleModal();
  };

  return (
    <div className="Detail">
      <div className="detail-box">
        <h1 className="title">
          <strong>Detalle del pedido</strong>
        </h1>
        <div className="address">
          <h3>
            <strong>{addressTitle}</strong>
          </h3>
          <h3>{order.details.address}</h3>
        </div>
        <div className="items">
          <h3>
            <strong>Resumen</strong>
          </h3>
          {order.items.map((value, index) => (
            <div className="item" key={index}>
              <p className="name">{value.name}</p>
              <p>{"x" + value.quantity}</p>
              <p>
                {currencyFormatter().format(
                  value.pricePerUnit * value.quantity
                )}
              </p>
            </div>
          ))}
        </div>
        <Form>
          <FormGroup tag="fieldset">
            <h1>
              <strong>Método de pago</strong>
            </h1>
            <div className="radio-group">
              <FormGroup check>
                <Label check className="pay-method-label">
                  <Input
                    type="radio"
                    defaultChecked={true}
                    name="paymethod"
                    className="pay-method-radio"
                    onClick={() => { setSelectedMethod(PAYMENT_TYPE.CASH); }}
                  />
                  {PAYMENT_TYPE.CASH}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check className="pay-method-label">
                  <Input
                    type="radio"
                    name="paymethod"
                    className="pay-method-radio"
                    onClick={() => { setSelectedMethod(PAYMENT_TYPE.DEBIT); }}
                  />
                  {PAYMENT_TYPE.DEBIT}
                </Label>
              </FormGroup>
            </div>
          </FormGroup>
        </Form>
        {selectedMethod === PAYMENT_TYPE.DEBIT && (
          <PaymentInputs
            setCardCVC={setCardCVC}
            setCardDate={setCardDate}
            setCardNumber={setCardNumber}
            setCardIsValid={setCardIsValid}
          />
        )}
      </div>
      <div className="detail-total">
        <p>Total</p>
        <p>{currencyFormatter().format(order.total)}</p>
      </div>
      <McButton
        text={"Enviar pedido"}
        onClick={() => {
          if (selectedMethod === PAYMENT_TYPE.DEBIT && !cardIsValid) {
            handleCardWarning("La información de la tarjeta es inválida");
          } else {
            confirmOrder(selectedMethod, {
              number: cardNumber,
              date: cardDate,
              cvc: cardCVC,
            });
          }
        }}
        fixed
      />
      <InfoModal
        toggle={toggleModal}
        isOpen={showModal}
        title="Atención"
        message={modalMessage}
      />
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  // User validation check
  const [isValidated, setIsValidated] = useState(false);
  const { order, updateOrder } = useOrderContext();
  const { getStorageItem } = useLocalStorage();

  useEffect(() => {
    // Exit if there is no order in the state
    if (order.items.length <= 0) {
      navigate(URLS.ROOT);
    }

    const user = getStorageItem(STORAGE.USER);
    if (user) {
      setIsValidated(true);
    }
  }, [order, navigate, getStorageItem]);

  const confirmOrder = (payMethod: string, details: CardDetailsType) => {
    updateOrder({ ...order, confirmed: true, paymentType: payMethod });
    console.log(details);
    navigate(URLS.ROOT);
  };

  return (
    <div className="Checkout">
      {!isValidated && <UserForm setIsValidated={setIsValidated} />}
      {isValidated && <Detail order={order} confirmOrder={confirmOrder} />}
    </div>
  );
};

export default Checkout;
