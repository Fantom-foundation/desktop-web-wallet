import React, { FC, useCallback } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import Identicon from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { push as historyPush, push } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import styles from './styles.module.scss';
import { pick } from 'ramda';
import { IState } from '~/redux';
import { IAccountState } from '~/redux/account';
import fileSaver from 'file-saver';
import { IAccount } from '~/redux/account/types';
import { AccountListItem } from '../AccountListItem';

import { Layout } from '~/view/components/layout/Layout';

import { Link } from 'react-router-dom';
import KeyIcon from '../../../../images/icons/key.png';
import WalletIcon from '../../../../images/icons/wallet.png';
import { AddressBalanceCard } from '../../../components/cards';
import classnames from 'classnames';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = (state: IState): Pick<IAccountState, 'list'> =>
  pick(['list'])(selectAccount(state));
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountListUnconnected: FC<IProps> = ({
  list,
  push,
}) => {
  const onAccountSelect = useCallback(
    (address: string) => {
      push(URLS.ACCOUNT.BASE(address));
    },
    [push]
  );

  const goToRoute = type => {
    if(type === 'create'){
      push('/account/create');
    } else if(type === 'access'){
      push('/account/restore');
    }
  };

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
      {!!list && Object.values(list).length > 0 ? (
        <div className={styles.homeWrapper}>
          <Container className={styles.container}>
            <Row>
              {Object.values(list).length > 0 &&
                Object.values(list).map(account => {
                  return (
                    <Col
                      lg={6}
                      md={6}
                      className={styles.marginBottom}
                      onClick={() => onAccountSelect(account.publicAddress)}
                    >
                      <AddressBalanceCard
                        address={account.publicAddress}
                      />
                    </Col>
                  );
                })}
              <Col lg={6} md={6} className={styles.marginBottom}>
                <AddressBalanceCard
                  addNew
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className={styles.homeWrapper}>
          <Container>
            <div className={styles.desktopView}>
              <Row>
                <Col xl={6} lg={12} className={styles.marginBottom}>
                  <Card
                    className={classnames(
                      'bg-dark-periwinkle text-white h-100',
                      styles.card
                    )}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardIcon}>
                        <img src={WalletIcon} alt="wallet" />
                      </div>
                      <div className={styles.homecontent}>
                        <div className={styles.text}>
                          <h2>Create a new wallet</h2>
                          <p>
                            Generate your unique Fantom wallet. Receive your own
                            unique public address, and create access and
                            recovery credentials.
                          </p>
                        </div>
                        <button
                          type="button"
                          className={styles.walletBtn}
                          onClick={() => goToRoute('create')}
                        >
                          Get started
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xl={6} lg={12} md={12} className={styles.marginBottom}>
                  <Card
                    className={classnames(
                      'bg-topaz text-white h-100',
                      styles.card
                    )}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardIcon}>
                        <img src={KeyIcon} alt="key" />
                      </div>
                      <div className={styles.homecontent}>
                        <div className={styles.text}>
                          <h2>Access your wallet</h2>
                          <p>
                            Connect to the Fantom network and:
                            <ul>
                              <li>Send and receive FTM</li>
                              <li>Stake your FTM</li>
                              <li>Collect your rewards</li>
                            </ul>
                          </p>
                        </div>
                        <button type="button" className={styles.walletBtn} onClick={() => goToRoute('access')}>
                          Access now
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className={styles.mobileView}>
              <Row>
                <Col lg={12} className="mb-4">
                  <button
                    type="button"
                    className={classnames(
                      'bg-dark-periwinkle',
                      styles.mobileBtn
                    )}
                  >
                    Create a new wallet
                  </button>
                </Col>
                <Col lg={12} className="mb-4">
                  <button
                    type="button"
                    className={classnames('bg-topaz', styles.mobileBtn)}
                  >
                    Access your wallet
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )}
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
