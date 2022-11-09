import type {Dispatch, SetStateAction} from 'react';
import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

type Radio = {
  label: string;
  value: number;
};

type McRadioProps = {
  radios: Radio[];
  onChange: Dispatch<SetStateAction<number>>;
};

const McRadio: React.FC<McRadioProps> = ({radios, onChange}) => {
  return (
    <>
      {radios.map((radio) => (
        <FormGroup check key={radio.value}>
          <Input
            name="radio"
            type="radio"
            value={radio.value}
            onChange={(e) => {
              onChange(Number(e.target.value));
            }}
          />{' '}
          <Label check>{radio.label}</Label>
        </FormGroup>
      ))}
    </>
  );
};

export default McRadio;
