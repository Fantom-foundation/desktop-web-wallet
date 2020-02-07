import React from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';
import CircleProgress from '../../../components/circleProgress';

export default () => (
  <Card className="h-100">
    <p className="fcard-label mb-0">
      Collateral
      <span className={`${styles.infoIcon} ml-2`}>
        <i className="fas fa-info-circle" />
      </span>
    </p>
    <CircleProgress />
  </Card>
);
