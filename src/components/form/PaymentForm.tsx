import {Form, FormGroup} from 'reactstrap';
import {PAYMENT_TYPE} from 'src/config';
import PaymentFormGroup from './PaymentFormGroup';

type PaymentFormProps = {
  handleSelectedMethod: (paymentMethod: string) => void;
};

const PaymentForm = ({handleSelectedMethod}: PaymentFormProps) => {
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
