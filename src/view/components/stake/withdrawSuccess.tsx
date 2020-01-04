import React from 'react';
import { Card } from 'reactstrap';
import classnames from 'classnames';
import { CheckCircleIcon } from 'src/view/components/svgIcons';

const WithdrawSuccessCard = ({ cardCss, iconGapCss }) => {
  return (
    <Card className={classnames(cardCss, 'mb-5 mt-5')}>
      <h2 className={iconGapCss}>
        Withdrawal successful! <br /> The tokens are now in your wallet
      </h2>

      <div>
        <CheckCircleIcon />
      </div>
    </Card>
  );
};

export default WithdrawSuccessCard;
