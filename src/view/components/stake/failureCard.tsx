import React from 'react';
import {  Card} from 'reactstrap'
import classnames from 'classnames'
import {
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';

const FailureCard = ({cardCss, iconGapCss}) => {
  return (
    <Card className={classnames(cardCss, 'mb-5')}>
      <h2 className={iconGapCss}>
      Something went wrong.
        <br />
      Please try again.
      </h2>
      <div>
        <ErrorCircleIcon />
      </div>
    </Card>
         )
}

export default FailureCard