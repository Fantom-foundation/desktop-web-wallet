import React from 'react';
import styles from './styles.module.scss';
import mockData from './mockData';
import { Card } from 'reactstrap';
const SubView = (props: any) => {
  const { title, value } = props;
  return (
    <div>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};
const DataRow = props => {
  const { name, poi, validatingPower, uptime, subView = [] } = props;
  return (
    <div>
      <SubView />
      {subView.map((data: object, index: number) => (
        <SubView key={index} {...data} />
      ))}
    </div>
  );
};

export default () => (
  <Card>
    <h2 className="font-weight-extra-bold">Validators</h2>
    <p>Click on a validator for more info</p>
    <div>
      {mockData.map((data: object, index: number) => (
        <DataRow key={index} {...data} />
      ))}
    </div>
  </Card>
);
