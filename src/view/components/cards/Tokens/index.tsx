import React from 'react';
import { Card } from 'reactstrap';
import classes from './styles.scss';

const mockData = [
  { title: 'Fantom', value: '150,615.22 FTM' },
  { title: 'CSDT', value: '500 CSDT' },
];

export default () => (
  <Card className="h-100">
    <p className="card-label">Tokens</p>
  </Card>
);
