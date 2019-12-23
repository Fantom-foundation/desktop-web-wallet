import React, { FC } from 'react';
import { Row, Col, Container, Card } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import { AccountDetailsInfo } from '~/view/components/account/AccountDetailsInfo';
import styles from './styles.module.scss';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { AccountTransactionsList } from '../AccountTransactionsList';
import Activity from 'src/view/components/activity';

const overViewMock = [
  { title: 'Price', value: '$0.01125923' },
  { title: 'Market cap', value: '$23,680,784.07' },
];

interface IProps {
  account: IAccount;
}

const AccountDetails: FC<IProps> = ({ account }) => {
  // return (
  //   <Container className={styles.wrap}>
  //     <Row className={styles.row}>
  //       <Col md={12} lg={4}>
  //         <AccountDetailsInfo account={account} />
  //       </Col>

  //       <Col md={12} lg={8} className={styles.transactions}>
  //         <AccountTransactionsList account={account} />

  //         <DialogInfo
  //           isOpened={false}
  //           onClose={console.log}
  //           title="Transfer Status"
  //           body="Status text body"
  //         />
  //       </Col>
  //     </Row>
  //   </Container>
  // );
  return (
    <div>
      <Row>
        <Col xl={7} className="mb-6">
          <Card className="h-100">
            <p className="card-label">Balance</p>
            <div className="d-flex align-items-center justify-content-end mb-3">
              <h1 className="mb-0">{account.balance}</h1>
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
  // return <p>asdasd</p>;
};

export { AccountDetails };
