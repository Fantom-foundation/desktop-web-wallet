import React from 'react';
import { Card } from 'reactstrap';

const WithdrawalProgress = ({ withdrawalText }) => {
  return (
    <Card className="mx-auto text-center pt-5 pb-6" style={{ maxWidth: 670 }}>
      <h2 className="mb-5">{withdrawalText}</h2>
    </Card>
  );
};

export default WithdrawalProgress;
