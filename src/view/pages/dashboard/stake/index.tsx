import React from 'react';
import { Row, Col, Card } from 'reactstrap';

const overViewMock = [
  { title: 'Available to stake', value: '200,756,680.84 FTM' },
  { title: 'Currently staking', value: '0 FTM' },
];
const rewardMock = [
  { title: 'Claimed rewards', value: '0 FTM' },
  { title: 'Available to claim', value: '0 FTM' },
];
export default () => (
  <div>
    <Row>
      <Col xl={6} className="mb-6">
        <Card className="h-100">
          <p className="card-label mb-4">Overview</p>
          <div className="text-right">
            {overViewMock.map(({ title, value }) => (
              <>
                <h2 className="pt-3">{value}</h2>
                <h3 className="opacity-5 mb-3">{title}</h3>
              </>
            ))}
          </div>
        </Card>
      </Col>
      <Col xl={6} className="mb-6">
        <Card className="h-100">
          <p className="card-label mb-4">Rewards</p>
          <div className="text-right">
            {rewardMock.map(({ title, value }) => (
              <>
                <h2 className="pt-3">{value}</h2>
                <h3 className="opacity-5 mb-3">{title}</h3>
              </>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <h2>What would you like to do?</h2>
        </Card>
      </Col>
    </Row>
  </div>
);
