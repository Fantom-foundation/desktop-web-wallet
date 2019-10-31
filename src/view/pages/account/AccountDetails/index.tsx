import React, { FC } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import { AccountDetailsInfo } from '~/view/components/account/AccountDetailsInfo';
import * as styles from './styles.module.scss';
import SendMoney from '~/view/general/sidebar/index';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';

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
