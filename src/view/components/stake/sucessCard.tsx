import React from 'react';
import { Card} from 'reactstrap'
import classnames from 'classnames'
import {
  CheckCircleIcon,
} from 'src/view/components/svgIcons';

const SuccessCard = ({cardCss, iconGapCss}) => {
  return (
    <Card className={classnames(cardCss, 'mb-5')}>
      <h2 className={iconGapCss}>
        Congratulations!
        <br />
        {' '}
FTM successfully staked.
      </h2>

      <div>
        <CheckCircleIcon />
      </div>
    </Card>
         )
}

export default SuccessCard