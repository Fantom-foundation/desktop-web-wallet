import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default ({ label = '' }) => (
  <div>
    <FormGroup>
      {label !== '' && <Label>{label}</Label>}
      <Input />
    </FormGroup>
  </div>
);
