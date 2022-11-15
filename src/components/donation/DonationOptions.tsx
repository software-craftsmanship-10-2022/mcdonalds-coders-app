import type {Dispatch, SetStateAction} from 'react';
import {FormGroup, Input, Label} from 'reactstrap';
import McRadio from '../radio/McRadio';
import {DONATION_OPTIONS} from './constants';
import DonationOptionsInfo from './DonationOptionsInfo';

type DonationProps = {
  formDonationIsVisible: boolean;
  updateDonationFormVisibility: (isFormOpen: boolean) => void;
  updateDonationValue: (value: number) => void;
};
const DonationOptions = ({
  formDonationIsVisible,
  updateDonationFormVisibility,
  updateDonationValue,
}: DonationProps) => {
  const handleDonationForm = (isFormOpen: boolean) => {
    updateDonationFormVisibility(isFormOpen);
    if (!isFormOpen) updateDonationValue(0);
  };

  return (
    <div>
      <FormGroup check className="donation-checkbox">
        <Input
          type="checkbox"
          onChange={(e) => {
            handleDonationForm(e.target.checked);
          }}
        />
        <Label check>
          Quieres donar a la <a href="https://fundacionronald.org/">Fundación Ronald McDonald</a>?
        </Label>
      </FormGroup>
      <DonationOptionsInfo />
      <div className="donation-options">
        {formDonationIsVisible && (
          <McRadio
            radios={DONATION_OPTIONS}
            onChange={updateDonationValue as Dispatch<SetStateAction<number>>}
          />
        )}
      </div>
    </div>
  );
};

export default DonationOptions;
