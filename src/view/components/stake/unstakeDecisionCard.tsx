import React from 'react';
import { Card, Button } from 'reactstrap';
import classnames from 'classnames';

const UnstakeDecisionCard = ({ handleStep, unStakeAmount }) => {
  return (
    <Card className="mx-auto text-center pt-5 pb-6" style={{ maxWidth: 670 }}>
      <h2 className="mb-5">
        The withdrawal of your staked tokens will take 7 days.
      </h2>
      <div
        className="mx-auto mt-4 w-100 d-flex justify-content-between"
        style={{ maxWidth: 480 }}
      >
        <Button
          onClick={() => handleStep('back')}
          color="darkish-pink"
          className={classnames('lg outlined mx-4')}
        >
          Maybe later
        </Button>
        <Button
          onClick={() => unStakeAmount(true)}
          color="topaz"
          className={classnames('lg outlined mx-4')}
        >
          Ok, unstake
        </Button>
      </div>
    </Card>
  );
};

export default UnstakeDecisionCard;
