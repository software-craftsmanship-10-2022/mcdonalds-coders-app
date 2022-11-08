import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

const McRadio: React.FC<{radios: Array<{label: string; value: number}>}> = ({radios}) => {
  return (
    <>
      {radios.map((radio) => (
        <FormGroup check key={radio.value}>
          <Input name="radio2" type="radio" value={radio.value} />{' '}
          <Label check>{radio.label}</Label>
        </FormGroup>
      ))}
    </>
  );
};

export default McRadio;
