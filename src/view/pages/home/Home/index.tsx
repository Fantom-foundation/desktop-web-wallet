import React, { FC } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from 'reactstrap';

import Particles from 'react-particles-js';
import { PARTICLES_PARAMS } from '~/constants/particles';
import styles from './styles.module.scss';
import { Layout } from '~/view/components/layout/Layout';

import { Link } from 'react-router-dom';
import KeyIcon from '../../../../images/icons/key.png';
import WalletIcon from '../../../../images/icons/wallet.png';
import { AddressBalanceCard } from '../../../components/cards';
import classnames from 'classnames';
import { push } from 'connected-react-router';

function goToRoute(props) {
  props.history.push('/account/create');
}
const Home: FC<{}> = props => {
  // const { history } = props;
  return (
    <Layout noFooter>
      <div className={styles.banner}>
        <Container>
          <h1 className={styles.homeTitle}>Welcome to FantomWallet</h1>
          <h3 className="font-weight-semi-bold">
            Send, receive and stake your FTM
          </h3>
        </Container>
      </div>
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
                          unique public address, and create access and recovery
                          credentials.
                        </p>
                      </div>
                      <button
                        type="button"
                        className={styles.walletBtn}
                        onClick={() => goToRoute(props)}
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
                      <button type="button" className={styles.walletBtn}>
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
                  className={classnames('bg-dark-periwinkle', styles.mobileBtn)}
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

      <Particles params={PARTICLES_PARAMS} className={styles.particles} />
    </Layout>
  );
};

export default Home;
