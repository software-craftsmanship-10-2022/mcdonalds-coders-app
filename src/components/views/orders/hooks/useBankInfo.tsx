import {useState} from 'react';

export type BankDataType = {
  fullName: string;
  iban: string;
};

type BankUpdateType = {
  fullName: (fullName: string) => void;
  iban: (iban: string) => void;
};

type UseBankInfoType = {
  bankData: BankDataType;
  bankUpdate: BankUpdateType;
};

const useBankInfo = (): UseBankInfoType => {
  const [fullName, setFullName] = useState('');
  const [iban, setIban] = useState('');

  const bankData = {
    fullName,
    iban,
  };

  const bankUpdate = {
    fullName(fullName: string) {
      setFullName(fullName);
    },
    iban(iban: string) {
      setIban(iban);
    },
  };

  return {
    bankData,
    bankUpdate,
  };
};

export default useBankInfo;
