import React from 'react';
import classnames from 'classnames';
import { Card, Button } from 'reactstrap';

const stackUnstack = ({
  handleStep,
  isStaked = false,
  selectedAddress = {
    isDeligated: false,
  },
}) => {
  const isDeligated = selectedAddress && selectedAddress.isDeligated;

  return (
    <Card className="mx-auto text-center pt-5 pb-6" style={{ maxWidth: 670 }}>
      <h2 className="mb-5">What would you like to do?</h2>
      <div
        className={
          true
            ? 'mx-auto mt-4 w-100 d-flex justify-content-between'
            : 'mx-auto mt-4 w-100'
        }
        style={{ maxWidth: 480 }}
      >
        {true ? (
          <Button
            className={classnames('lg mx-4')}
            onClick={() => handleStep('unstake')}
          >
            Unstake
          </Button>
        ) : (
          <div className={classnames('lg mx-4')} />
        )}
        <Button
          color="topaz"
          onClick={() => handleStep('stake')}
          className={
            isDeligated
              ? classnames('lg outlined mx-4')
              : classnames('lg outlined')
          }
        >
          Stake
        </Button>
      </div>
    </Card>
  );
};

export default stackUnstack;
