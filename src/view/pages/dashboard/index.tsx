import React from 'react';
import { Row, Col, Card, Table } from 'reactstrap';
import Activity from 'src/view/components/activity';

const overViewMock = [
  { title: 'Price', value: '$0.01125923' },
  { title: 'Market cap', value: '$23,680,784.07' },
];
export default () => (
  <div>
    <Row>
      <Col xl={7} className="mb-6">
        <Card className="h-100">
          <p className="card-label">Balance</p>
          <div className="d-flex align-items-center justify-content-end mb-3">
            <h1 className="mb-0">200,756,680.84</h1>
            <h2 className="mb-0">&nbsp;FTM</h2>
          </div>
          <p className="text-right text-usd">
            2,700,177.35<span>USD</span>
          </p>
        </Card>
      </Col>
      <Col xl={5} className="mb-6">
        <Card className="h-100">
          <p className="card-label ">Overview</p>
          {overViewMock.map(({ title, value }) => (
            <div className="d-flex justify-content-between">
              <h4 className="opacity-7">{title}:</h4>
              <p className="font-weight-semi-bold">{value}</p>
            </div>
          ))}
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Activity />
      </Col>
    </Row>
  </div>
);
