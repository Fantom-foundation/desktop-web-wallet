import React, { FC } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import { AccountDetailsInfo } from '~/view/components/account/AccountDetailsInfo';
import * as styles from './styles.module.scss';

interface IProps {
  account: IAccount;
}

const AccountDetails: FC<IProps> = ({ account }) => (
  <Container className={styles.wrap}>
    <Row className={styles.row}>
      <Col md={12} lg={4}>
        <AccountDetailsInfo account={account} />
      </Col>
      <Col md={12} lg={8}>
        Transactions will appear here
      </Col>
    </Row>
  </Container>
);

export { AccountDetails };
