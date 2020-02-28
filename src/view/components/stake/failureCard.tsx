import React from 'react';
import {  Card} from 'reactstrap'
import classnames from 'classnames'
import {
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';

const FailureCard = ({cardCss, iconGapCss, t}) => {
  return (
    <Card className={classnames(cardCss, 'mb-5')}>
      <h2 className={iconGapCss}>
        {t("somethingWentWrong")}
.
        <br />
        {t("pleaseTryAgain")}
.
      </h2>
      <div>
        <ErrorCircleIcon />
      </div>
    </Card>
         )
}

export default FailureCard