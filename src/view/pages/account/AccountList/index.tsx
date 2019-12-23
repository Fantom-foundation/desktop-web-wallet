import React, { FC, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Identicon from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { push as historyPush } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import styles from './styles.module.scss';
import { pick } from 'ramda';
import { IState } from '~/redux';
import { IAccountState } from '~/redux/account';
import fileSaver from 'file-saver';
import { IAccount } from '~/redux/account/types';
import { AccountListItem } from '../AccountListItem';

import Particles from 'react-particles-js';
import { PARTICLES_PARAMS } from '~/constants/particles';
import { Layout } from '~/view/components/layout/Layout';

import { Link } from 'react-router-dom';
import KeyIcon from '../../../../images/icons/key.png';
import WalletIcon from '../../../../images/icons/wallet.png';
import { AddressBalanceCard } from '../../../components/cards';
import classnames from 'classnames';
import { push } from 'connected-react-router';
import { accountUploadKeystore } from '~/redux/account/actions';

const mapStateToProps = (state: IState): Pick<IAccountState, 'list'> =>
  pick(['list'])(selectAccount(state));
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountListUnconnected: FC<IProps> = ({ list, push }) => {
  debugger;
  const onAccountSelect = useCallback(
    (address: string) => {
      push(URLS.ACCOUNT.BASE(address));
    },
    [push]
  );

  return (
    <Layout>
      <div className={styles.banner}>
        <Container>
          <h1 className={styles.homeTitle}>Welcome to FantomWallet</h1>
          <h3 className="font-weight-semi-bold">
            Send, receive and stake your FTM
          </h3>
        </Container>
      </div>
      <div className={styles.homeWrapper}>
        <Container className={styles.container}>
          <Row>
            {Object.values(list).length > 0 &&
              Object.values(list).map(account => {
                console.log('*****account', account);
                return (
                  <Col
                    xl={6}
                    className={styles.marginBottom}
                    onClick={() => onAccountSelect(account.publicAddress)}
                  >
                    <AddressBalanceCard
                      address={account.publicAddress}
                      balance={account.balance}
                    />
                  </Col>
                );
              })}
            <Col xl={6} className={styles.marginBottom}>
              <AddressBalanceCard addNew />
            </Col>
          </Row>
        </Container>
      </div>

      <Particles params={PARTICLES_PARAMS} className={styles.particles} />
    </Layout>
    // </Layout>
    // <div>
    //   <section>
    //     <Container className={styles.title}>
    //       <Row>
    //         <Col>
    //           <h2>
    //             <span>Account Management</span>
    //           </h2>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </section>

    //   <section className={styles.content}>
    //     <Container>
    //       <div className={styles.grid}>
    //         {Object.values(list).length > 0 &&
    //           Object.values(list).map(account => (
    //             <AccountListItem
    //               account={account}
    //               onSelect={onAccountSelect}
    //               key={account.publicAddress}
    //             />
    //           ))}
    //       </div>
    //     </Container>
    //   </section>
    // </div>
  );
};

const AccountList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListUnconnected);

export { AccountList, AccountListUnconnected };
