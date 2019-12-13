import React from 'react';
import { Row, Col, Card } from 'reactstrap';
export default () => (
  <div>
    <Row>
      <Col>
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
      <Col>
        <Card></Card>
      </Col>
    </Row>
  </div>
);
