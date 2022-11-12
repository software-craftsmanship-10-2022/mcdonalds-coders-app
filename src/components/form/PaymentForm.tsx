import {Form, FormGroup, Input, Label} from 'reactstrap';
import {PAYMENT_TYPE} from 'src/config';

type PaymentFormProps = {
  handleSelectedMethod: (paymentMethod: string) => void;
};

const PaymentForm = ({handleSelectedMethod}: PaymentFormProps) => {
  return (
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
                onClick={() => {
                  handleSelectedMethod(PAYMENT_TYPE.cash);
                }}
              />
              {PAYMENT_TYPE.cash}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check className="pay-method-label">
              <Input
                type="radio"
                name="paymethod"
                className="pay-method-radio"
                onClick={() => {
                  handleSelectedMethod(PAYMENT_TYPE.debit);
                }}
              />
              {PAYMENT_TYPE.debit}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check className="pay-method-label">
              <Input
                type="radio"
                name="paymethod"
                className="pay-method-radio"
                onClick={() => {
                  handleSelectedMethod(PAYMENT_TYPE.transfer);
                }}
              />
              {PAYMENT_TYPE.transfer}
            </Label>
          </FormGroup>
        </div>
      </FormGroup>
    </Form>
  );
};

export default PaymentForm;
