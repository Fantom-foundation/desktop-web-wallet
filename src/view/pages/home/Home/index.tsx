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

const Home: FC<{}> = () => {
  return (
    <Layout noFooter>
      <div className={styles.banner}>
        {/* <h2 className={styles.slogan}>Operachain Powered Wallet</h2>

        <h3 className={styles.subtitle}>Send and Receive FTM</h3>

        <div className={styles.buttons}>
          <Link className={styles.rounded} to="/account/create">
            Create Wallet
          </Link>

          <a
            className={styles.rounded}
            href="http://fantom.foundation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div> */}
        <Container>
          <h1 className={styles.heading}>Welcome to FantomWallet</h1>
          <h3 className="font-weight-semi-bold">
            Send, receive and stake your FTM
          </h3>
        </Container>
      </div>
      <div className={styles.homeWrapper}>
        <Container>
          <Row>
            <Col xl={6} lg={12}>
              <Card className="bg-dark-periwinkle text-white h-100">
                <CardBody>
                  <div className={styles.cardContent}>
                    <div className={styles.cardIcon}>
                      <img src={WalletIcon} alt="wallet" />
                    </div>
                    <div className={styles.homecontent}>
                      <h2>Create a new wallet</h2>
                      <p>
                        Generate your unique Fantom wallet. Receive your own
                        unique public address, and create access and recovery
                        credentials.
                      </p>
                      <button type="button" className={styles.walletBtn}>
                        Get started
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6} lg={12} md={12}>
              <Card className="bg-topaz text-white h-100">
                <CardBody>
                  <div className={styles.cardContent}>
                    <div className={styles.cardIcon}>
                      <img src={KeyIcon} alt="key" />
                    </div>
                    <div className={styles.homecontent}>
                      <h2>Access your wallet</h2>
                      <p>
                        Connect to the Fantom network and:
                        <ul>
                          <li>Send and receive FTM</li>
                          <li>Stake your FTM</li>
                          <li>Collect your rewards</li>
                        </ul>
                      </p>
                      <button type="button" className={styles.walletBtn}>
                        Access now
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Particles params={PARTICLES_PARAMS} className={styles.particles} />
    </Layout>
  );
};

export default Home;
