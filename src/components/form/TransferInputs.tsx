import McInput from '../input/McInput';

type TransferInputsProps = {
  setFullName: (fullName: string) => void;
  setIBAN: (iban: string) => void;
};

// Card input info
const TransferInputs = ({setFullName, setIBAN}: TransferInputsProps) => {
  const ERROR_MESSAGES = {
    emptyCardNumber: 'El número de la tarjeta es inválido',
    invalidCardNumber: 'El número de la tarjeta es inválido',
    emptyExpiryDate: 'La fecha de expiración es inválida',
    monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
    yearOutOfRange: 'El año de expiración no puede estar en el pasado',
    dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
    invalidExpiryDate: 'La fecha de expiración es inválida',
    emptyCVC: 'El código de seguridad es inválido',
    invalidCVC: 'El código de seguridad es inválido',
  };

  // Const {wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps} =
  //   useTransferInputs({
  //     errorMessages: ERROR_MESSAGES,
  //   });

  // useEffect(() => {
  //   setCardIsValid(!wrapperProps.error);
  // }, [wrapperProps.error, setCardIsValid]);

  // // Card event handlers
  // const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCardNumber(e.target.value);
  // };

  // const handleCardDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCardDate(e.target.value);
  // };

  // const handleCardCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCardCVC(e.target.value);
  // };

  return (
    <div className="UserFormContainer">
      <McInput
        id={'input-name'}
        type={'text'}
        label={'Nombre y apellidos'}
        width={'100%'}
        value={''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFullName(e.target.value);
        }}
      />
      <McInput
        id={'input-name'}
        type={'text'}
        label={'IBAN'}
        width={'100%'}
        value={''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIBAN(e.target.value);
        }}
      />
    </div>
  );
};

export default TransferInputs;
