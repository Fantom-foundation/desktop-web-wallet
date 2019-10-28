import React, { FC } from 'react';
import { Button, Col, Row, Container } from 'reactstrap';
import classNames from 'classnames';

interface IProps {
  onNextPressed: () => void;
  onBackPressed: () => void;
  is_next_disabled?: boolean;
  is_prev_disabled?: boolean;
}

const CreateAccountButtons: FC<IProps> = ({
  onNextPressed,
  onBackPressed,
  is_next_disabled,
  is_prev_disabled,
}) => (
  <section style={{ padding: '40px 0' }}>
    <Container>
      <Row className="back-next-btn">
        <Col className="text-right">
          <Button className={classNames({ light: is_prev_disabled })} onClick={onBackPressed} disabled={is_prev_disabled}>
            <i className="fas fa-chevron-left" />
            &nbsp;Back
          </Button>
        </Col>
        <Col>
          <Button className={classNames({ light: is_next_disabled })} onClick={onNextPressed} disabled={is_next_disabled}>
            Next&nbsp;
            <i className="fas fa-chevron-right" />
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);

export { CreateAccountButtons };
