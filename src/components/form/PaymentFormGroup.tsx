import {FormGroup, Input, Label} from 'reactstrap';

type PaymentFormGroupProps = {
  type: string;
  handleSelectedMethod: (paymentMethod: string) => void;
};

const PaymentFormGroup = ({type, handleSelectedMethod}: PaymentFormGroupProps) => {
  return (
    <FormGroup check>
      <Label check className="pay-method-label">
        <Input
          type="radio"
          defaultChecked={true}
          name="paymethod"
          className="pay-method-radio"
          onClick={() => {
            handleSelectedMethod(type);
          }}
        />
        {type}
      </Label>
    </FormGroup>
  );
};

export default PaymentFormGroup;
