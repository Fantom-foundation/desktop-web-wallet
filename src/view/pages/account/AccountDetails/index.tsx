import React, { FC } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import { AccountDetailsInfo } from '~/view/components/account/AccountDetailsInfo';
import styles from './styles.module.scss';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { AccountTransactionsList } from '../AccountTransactionsList';

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
        <AccountTransactionsList account={account} />

        <DialogInfo
          isOpened={false}
          onClose={console.log}
          title="Transfer Status"
          body="Status text body"
        />
      </Col>
    </Row>
  </Container>
);

export { AccountDetails };
