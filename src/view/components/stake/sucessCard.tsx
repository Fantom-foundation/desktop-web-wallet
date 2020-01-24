import React from 'react';
import { Card} from 'reactstrap'
import classnames from 'classnames'
import {
  CheckCircleIcon,
} from 'src/view/components/svgIcons';

const SuccessCard = ({cardCss, iconGapCss, t}) => {
  return (
    <Card className={classnames(cardCss, 'mb-5')}>
      <h2 className={iconGapCss}>
        {t("congratulations")}
        <br />
        {' '}
        {t("ftmSuccessfullyStaked.")}
      </h2>

      <div>
        <CheckCircleIcon />
      </div>
    </Card>
         )
}

export default SuccessCard