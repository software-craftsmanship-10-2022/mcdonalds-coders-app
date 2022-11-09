import type {Dispatch, SetStateAction} from 'react';
import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

const McRadio: React.FC<{
  radios: Array<{label: string; value: number}>;
  onChange: Dispatch<SetStateAction<number>>;
}> = ({radios, onChange}) => {
  return (
    <>
      {radios.map((radio) => (
        <FormGroup check key={radio.value}>
          <Input
            name="radio2"
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
