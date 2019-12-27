import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card, Button } from 'reactstrap';
import { DashboardInput } from 'src/view/components/forms';
import classnames from 'classnames';
import { StakeSummaryCard } from 'src/view/components/cards';
import StakeValidators from 'src/view/components/stakeValidators';

import {
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';

const overViewMock = [
  { title: 'Available to stake', value: '200,756,680.84 FTM' },
  { title: 'Currently staking', value: '0 FTM' },
];
const rewardMock = [
  { title: 'Claimed rewards', value: '0 FTM' },
  { title: 'Available to claim', value: '0 FTM' },
];
export default () => {
  const [to, setTo] = useState('');
  return (
    <div>
      <Row>
        <Col md={6} className="mb-6">
          <Card className="h-100">
            <p className="card-label mb-4">Overview</p>
            <div className="text-right">
              {overViewMock.map(({ title, value }) => (
                <>
                  <h2 className="pt-3">{value}</h2>
                  <h3 className="opacity-5 mb-3">{title}</h3>
                </>
              ))}
            </div>
          </Card>
        </Col>

        <Col md={6} className="mb-6">
          <Card className="h-100 ">
            <p className="card-label mb-4">Rewards</p>
            <div className="text-right">
              {rewardMock.map(({ title, value }) => (
                <>
                  <h2 className="pt-3">{value}</h2>
                  <h3 className="opacity-5 mb-3">{title}</h3>
                </>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <StakeValidators />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card
            className="mx-auto text-center pt-5 pb-6"
            style={{ maxWidth: 670 }}
          >
            <h2 className="mb-5">What would you like to do?</h2>
            <div
              className="mx-auto mt-4 w-100 d-flex justify-content-between"
              style={{ maxWidth: 480 }}
            >
              <Button className={classnames('lg mx-4')}>Unstake</Button>
              <Button color="topaz" className={classnames('lg outlined mx-4')}>
                Stake
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card
            className="mx-auto text-center pt-5 pb-6"
            style={{ maxWidth: 670 }}
          >
            <h2>How much FTM would you like to stake?</h2>
            <div className="mx-auto w-100" style={{ maxWidth: 480 }}>
              <DashboardInput
                lg
                placeholder="0"
                rightLabel="Max"
                handleChange={setTo}
              />
              <Button className={styles.validatorBtn}>
                Select a validator
                <i className="fas fa-chevron-right" />
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card
            className="mx-auto text-center pt-5 pb-6"
            style={{ maxWidth: 670 }}
          >
            <h2>How much FTM would you like to stake?</h2>
            <div className="mx-auto w-100" style={{ maxWidth: 480 }}>
              <DashboardInput
                lg
                placeholder="0"
                rightLabel="Max"
                handleChange={setTo}
              />
              <Button
                color="topaz"
                className={classnames(styles.validatorBtn, 'outlined lg')}
              >
                Select a validator
                <i className="fas fa-chevron-right" />
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <div className="mx-auto" style={{ maxWidth: 670 }}>
            <StakeSummaryCard />
          </div>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card className={classnames(styles.card, 'mb-5 mt-5')}>
            <h2 className={styles.iconGap}>
              Congratulations!
              <br /> FTM successfully staked.
            </h2>

            <div>
              <CheckCircleIcon />
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card className={classnames(styles.card, 'mb-5')}>
            <h2 className={styles.iconGap}>
              Something went wrong.
              <br />
              Please try again.
            </h2>
            <div>
              <ErrorCircleIcon />
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card
            className="mx-auto text-center pt-5 pb-6"
            style={{ maxWidth: 670 }}
          >
            <h2 className="mb-5">What would you like to do?</h2>
            <div
              className="mx-auto mt-4 w-100 d-flex justify-content-between"
              style={{ maxWidth: 480 }}
            >
              <Button
                color="darkish-pink"
                className={classnames('lg outlined mx-4')}
              >
                Maybe later
              </Button>
              <Button color="topaz" className={classnames('lg outlined mx-4')}>
                Ok, unstake
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <Card className="mx-auto text-center pt-5 pb-6">
            <h2 className="mb-5">What would you like to do?</h2>
            <div className={styles.stakeBtnWrap} style={{ maxWidth: 640 }}>
              <div className={styles.m50}>
                <Button
                  color="darkish-pink"
                  className={classnames('lg outlined')}
                >
                  Unstake
                </Button>
              </div>
              <div className={styles.m50}>
                <Button color="topaz" className={classnames('lg outlined')}>
                  Stake
                </Button>
              </div>
              <div className={styles.m100}>
                <Button color="primary" className={classnames('lg outlined')}>
                  Claim rewards
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
