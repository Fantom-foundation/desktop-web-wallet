import React from 'react';
import { Card, Button } from 'reactstrap';
import { DashboardInput } from 'src/view/components/forms';
import classnames from 'classnames';

const StakeInputCard = ({
  stakeValue,
  handleChange,
  validatorBtn,
  handleStep,
  errors,
  handleEntireBalance,
  balanceLeft,
}) => {
  let errorTxt = ''
  if(errors.stakeValueMax){
    errorTxt = 'Not enough FTM. Please enter a lower amount'
  } else if(errors.stakeValueMin){
    errorTxt = 'Minimum stake of 1 FTM required'

  } else if (errors.stakeValueInvalid){
    errorTxt = 'Invalid stake amount'

  } else if (errors.maxBalance){
    errorTxt = `You can stake max ${balanceLeft.toFixed(6)} (Value + gas * price)`

  }
  // const errorTxt = errors.stakeValueMax
  //   ? 'Not enough FTM. Please enter a lower amount'
  //   : errors.stakeValueMin ? 'Minimum stake of 1 FTM required': 'Invalid stake amount';
  return (
    <Card className="mx-auto text-center pt-5 pb-6" style={{ maxWidth: 670 }}>
      <h2>How much FTM would you like to stake?</h2>
      <div className="mx-auto w-100" style={{ maxWidth: 480 }}>
        <DashboardInput
          lg
          type="number"
          placeholder="0"
          rightLabel="Max"
          value={stakeValue}
          error={{
            isError: errors.stakeValueInvalid || errors.stakeValueMax || errors.stakeValueMin || errors.maxBalance,
            errorText: errorTxt,
          }}
          handleRightButton={() => handleEntireBalance()}
          handleChange={val => {
            handleChange(val);
          }}
        />
        {stakeValue !== '' ? (
          <Button
            color="topaz"
            className={classnames(validatorBtn, 'outlined lg')}
            onClick={handleStep}
          >
            Select a validator
            <i className="fas fa-chevron-right" />
          </Button>
        ) : (
          <Button className={validatorBtn} onClick={handleStep}>
            Select a validator
            <i className="fas fa-chevron-right" />
          </Button>
        )}
        {/* <Button className={validatorBtn} onClick={handleStep}>
          Select a validator
          <i className="fas fa-chevron-right" />
        </Button> */}
      </div>
    </Card>
  );
};

export default StakeInputCard;
