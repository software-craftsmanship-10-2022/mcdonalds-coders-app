import McInput from '../../input/McInput';

const PaypalPaymentInputs = () => {
  return (
    <div className="UserFormContainer">
      <h4>Escriba sus credenciales de Paypal</h4>
      <McInput id="username" type="text" label={'Usuario'} width={'100%'} />
      <McInput id="password" type="password" label={'Contraseña'} width={'100%'} />
    </div>
  );
};

export default PaypalPaymentInputs;
