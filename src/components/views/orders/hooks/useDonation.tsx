import {useState} from 'react';

type UseDonationType = {
  formDonationIsVisible: boolean;
  donationValue: number;
  updateDonationFormVisibility: (status: boolean) => void;
  updateDonationValue: (value: number) => void;
};

const useDonation = (): UseDonationType => {
  const [formDonationView, setFormDonationView] = useState(false);
  const [donationValue, setDonationValue] = useState(0);

  const updateDonationFormVisibility = (status: boolean) => {
    setFormDonationView(status);
  };

  const updateDonationValue = (value: number) => {
    setDonationValue(value);
  };

  return {
    formDonationIsVisible: formDonationView,
    donationValue,
    updateDonationFormVisibility,
    updateDonationValue,
  };
};

export default useDonation;
