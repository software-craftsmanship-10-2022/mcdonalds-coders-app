import {Form, FormGroup, Input, Label} from 'reactstrap';
import {PAYMENT_METHODS} from './constants/paymentMethodsTypes';

type PaymentFormProps = {
  selectedPaymentMethodId: string;
  onSelectedMethod: (id: string) => void;
};

const PaymentMethodForm = ({selectedPaymentMethodId, onSelectedMethod}: PaymentFormProps) => {
  return (
    <Form>
      <FormGroup tag="fieldset">
        <h1>
          <strong>Método de pago</strong>
        </h1>
        <div className="radio-group">
          {PAYMENT_METHODS.map((paymentType) => {
            return (
              <PaymentMethodRadioButton
                key={paymentType.id}
                isChecked={paymentType.id === selectedPaymentMethodId}
                text={paymentType.text}
                value={paymentType.id}
                onSelect={onSelectedMethod}
              />
            );
          })}
        </div>
      </FormGroup>
    </Form>
  );
};

type PaymentRadioButtonProps = {
  isChecked: boolean;
  text: string;
  value: string;
  onSelect: (id: string) => void;
};

const PaymentMethodRadioButton = ({isChecked, text, value, onSelect}: PaymentRadioButtonProps) => {
  return (
    <FormGroup check>
      <Label check className="pay-method-label">
        <Input
          type="radio"
          name="paymethod"
          className="pay-method-radio"
          checked={isChecked}
          value={value}
          onChange={(e) => {
            onSelect(e.target.value);
          }}
        />
        {text}
      </Label>
    </FormGroup>
  );
};

export default PaymentMethodForm;
