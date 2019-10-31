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
          isOpened
          onClose={console.log}
          title="Transfer Status"
          body="Status text body"
        />
        
        {true && (
          <SendMoney
            openTransferForm={console.log}
            transferMoney={console.log}
            ftmAmount="0.1"
            optionalMessage="MESSAGE"
            gasPrice="GAS_PRICE"
            password="PASSWORD"
            verificationError="ERROR"
            toAddress="TO_ADDRESS"
            onUpdate={console.log}
            setAccountType={console.log}
            selectedAccount="123"
            addClass={console.log}
            refreshWalletDetail={console.log}
            isValidAddress
            isRefreshing
          />
        )}
      </Col>
    </Row>
  </Container>
);

export { AccountDetails };
