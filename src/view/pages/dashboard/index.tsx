import React from 'react';
import { Row, Col, Card, Table } from 'reactstrap';
import Activity from 'src/view/components/activity';
export default () => (
  <div>
    <Row>
      <Col xl={7}>
        <Card>
          <p className="card-label">Balance</p>
          <p>
            200,756,680.84<span>FTM</span>
          </p>
          <p>
            2,700,177.35<span>USD</span>
          </p>
        </Card>
      </Col>
      <Col xl={5}>
        <Card>
          <p className="card-label ">Overview</p>
          <div>
            <p>Price:</p>
            <p>$0.01125923</p>
          </div>
          <div>
            <p>Market cap:</p>
            <p>$23,680,784.07</p>
          </div>
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
