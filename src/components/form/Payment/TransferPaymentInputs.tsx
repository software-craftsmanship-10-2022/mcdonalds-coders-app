import McInput from '../../input/McInput';

// Card input info
const TransferPaymentInputs = () => {
  return (
    <div className="UserFormContainer">
      <McInput id="name" type="text" label={'Nombre y apellidos'} width={'100%'} />
      <McInput id="iban" type="text" label={'IBAN'} width={'100%'} />
    </div>
  );
};

export default TransferPaymentInputs;
