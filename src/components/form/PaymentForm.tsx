import {Form, FormGroup} from 'reactstrap';
import {PAYMENT_TYPE} from 'src/config';
import PaymentFormGroup from './PaymentFormGroup';

type PaymentFormProps = {
  defaultPaymentMethod: string;
  handleSelectedMethod: (paymentMethod: string) => void;
};

const PaymentForm = ({defaultPaymentMethod, handleSelectedMethod}: PaymentFormProps) => {
  const PAYMENT_TYPES = Object.values(PAYMENT_TYPE);
  return (
    <Form>
      <FormGroup tag="fieldset">
        <h1>
          <strong>Método de pago</strong>
        </h1>
        <div className="radio-group">
          {PAYMENT_TYPES.map((paymentType) => {
            return (
              <PaymentFormGroup
                defaultChecked={paymentType === defaultPaymentMethod}
                key={paymentType}
                type={paymentType}
                handleSelectedMethod={handleSelectedMethod}
              />
            );
          })}
        </div>
      </FormGroup>
    </Form>
  );
};

export default PaymentForm;
