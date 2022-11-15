import McInput from '../input/McInput';

type TransferInputsProps = {
  setFullName: (fullName: string) => void;
  setIBAN: (iban: string) => void;
};

// Card input info
const TransferInputs = ({setFullName, setIBAN}: TransferInputsProps) => {
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
