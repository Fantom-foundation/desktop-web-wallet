import React from 'react';
import classnames from 'classnames';
import { Card, Button } from 'reactstrap';

const stackUnstack = ({
  handleStep,
  isStaked = false,
  selectedAddress = {
    isDeligated: false,
    deactivatedEpoch: 0,
  },
  t,
}) => {
  const isDeligated = selectedAddress && selectedAddress.isDeligated;
  const deactivatedEpoch = selectedAddress && selectedAddress.deactivatedEpoch;
  const isUnstaked = Number(deactivatedEpoch || 0);
  if (isUnstaked > 0) {
    return <div />;
  }
  return (
    <Card
      className="mx-auto text-center pt-5 pb-6 mt-3"
      style={{ maxWidth: 670 }}
    >
      <h2 className="mb-5">{t('whatLikeToDo?')}</h2>
      <div
        className={isDeligated ? 'mx-auto mt-4 w-100 ' : 'mx-auto mt-4 w-100'}
        style={{ maxWidth: 480 }}
      >
        {isDeligated ? (
          <Button
            className={classnames('lg mx-4')}
            onClick={() => handleStep('unstake')}
          >
            {t('unstake')}
          </Button>
        ) : (
          <Button
            color="topaz"
            onClick={() => handleStep('stake')}
            className={
              isDeligated
                ? classnames('lg outlined mx-4')
                : classnames('lg outlined')
            }
          >
            {t('stake')}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default stackUnstack;
