import React, { useState } from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';
import CircleProgress from '../../../components/circleProgress';
import CollateralModal from 'src/view/components/Modal/ModalContent/Collateral';

export default () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Card className="h-100">
      <p className="fcard-label mb-0">
        Collateral
        <span className={`${styles.infoIcon} ml-2`}>
          <i className="fas fa-info-circle" onClick={toggle} />
        </span>
      </p>
      <CircleProgress />
      <CollateralModal isOpen={modal} toggle={toggle} />
    </Card>
  );
};
