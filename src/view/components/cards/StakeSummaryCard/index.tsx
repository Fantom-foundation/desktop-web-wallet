import React, { useState } from 'react';
import { Card, Button } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import SpinnerSVG from '../../../../images/icons/spinner.svg';

export default ({ handleEditStep, stakeValue, validator }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <div className="mx-auto" style={{ maxWidth: 670 }}>
      <Card className="pb-6">
        <p className="card-label mb-6">Summary</p>
        <div className={styles.contentWrapper}>
          <div className={classnames(styles.fields)}>
            <h3 className={classnames('opacity-7', styles.label)}>
              Amount to stake:
            </h3>
            <h2 className={classnames(styles.value)}>
              {stakeValue} FTM
              <Button
                color="topaz"
                onClick={() => handleEditStep(2)}
                className={classnames('outlined', styles.editBtn)}
              >
                Edit
              </Button>
            </h2>
          </div>
          <div className={classnames(styles.fields)}>
            <h3 className={classnames('opacity-7', styles.label)}>
              Validator node:
            </h3>
            <h2 className={classnames(styles.validatorAddrValue)}>
              {validator}
              <Button
                color="topaz"
                onClick={() => handleEditStep(3)}
                className={classnames('outlined', styles.editBtn)}
              >
                Edit
              </Button>
            </h2>
          </div>
        </div>
        <div className={classnames('text-center', styles.btnWrapper)}>
          {!isSubmit ? (
            <Button
              color="topaz"
              onClick={() => setIsSubmit(true)}
              className={classnames('outlined lg')}
            >
              Stake
            </Button>
          ) : (
            <img
              style={{ height: '80%', width: '15%' }}
              src={SpinnerSVG}
              alt=""
            />
          )}
        </div>
      </Card>
    </div>
  );
};
