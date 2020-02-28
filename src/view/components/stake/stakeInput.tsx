import React from 'react';
import { Card, Button } from 'reactstrap';
import { DashboardInput } from 'src/view/components/forms';
import classnames from 'classnames';
import { useTranslation } from "react-i18next";

const StakeInputCard = ({
  stakeValue,
  handleChange,
  validatorBtn,
  handleStep,
  errors,
  handleEntireBalance,
  balanceLeft,
}) => {
const { t } = useTranslation();
  let errorTxt = ''
  if(errors.stakeValueMax){
    errorTxt = t("notEnoughFTM")
  } else if(errors.stakeValueMin){
    errorTxt = t('minStakeReq')

  } else if (errors.stakeValueInvalid){
    errorTxt = t("invalidStakeAmount")

  } else if (errors.maxBalance){
    errorTxt = `${t("canStakeMax")} ${balanceLeft.toFixed(6)} (Value + gas * price)`

  }
  // const errorTxt = errors.stakeValueMax
  //   ? 'Not enough FTM. Please enter a lower amount'
  //   : errors.stakeValueMin ? 'Minimum stake of 1 FTM required': 'Invalid stake amount';
  return (
    <Card className="mx-auto text-center pt-5 pb-6" style={{ maxWidth: 670 }}>
      <h2>
        {t("howMuchFTM")}
?
      </h2>
      <div className="mx-auto w-100" style={{ maxWidth: 480 }}>
        <DashboardInput
          lg
          type="number"
          placeholder="0"
          rightLabel={t("max")}
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
            {t("selectValidator")}
            <i className="fas fa-chevron-right" />
          </Button>
        ) : (
          <Button className={validatorBtn} onClick={handleStep}>
            {t("selectValidator")}
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
