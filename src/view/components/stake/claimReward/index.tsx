import React from 'react';
import { Card, Button, Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { Input } from '../../forms';
import { CheckCircleIcon } from 'src/view/components/svgIcons';
const InfoModal = () => {
  return (
    <>
      <button className={classnames(styles.infoBtn, 'btn-icon text-primary')}>
        <i className="fas fa-info-circle" />
      </button>
      <Modal isOpen={false} centered className={styles.infoModal}>
        <ModalBody className={styles.modalBody}>
          <h2 className="text-center mb-4 pb-2">
            Claim your rewards{' '}
            <span className={styles.cross}>
              <i className="fas fa-times"></i>
            </span>
          </h2>
          <h4 className="mb-3">You can claim your rewards in FTM or fUSD.</h4>
          <h4 className="mb-3">
            FTM rewards will be available after six months or when 80% of the
            circulating supply is staked, whichever comes first.
          </h4>
          <h4 className="mb-3">
            fUSD rewards are available at any time.
            <br />
            fUSD is a stablecoin pegged to the dollar: 1 fUSD = $1.
          </h4>
          <h3 className="mb-2">What can I do with fUSD?</h3>
          <h4>
            You can use fUSD in the DeFi section of your wallet. With it you
            can:
          </h4>
          <ul className="pl-4">
            <li>buy and sell synthetic tokens.</li>
            <li>use it as a collateral to borrow other assets.</li>
            <li>
              use it as a liquidity provider for loans and earn interest on it.
            </li>
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
};

const ClaimfUSDModal = () => {
  return (
    <>
      <Modal isOpen={false} centered className={styles.claimUsdModal}>
        <ModalBody className={styles.modalBody}>
          <h2 className="text-center mb-4 pb-2">
            Claim fUSD
            <span className={styles.cross}>
              <i className="fas fa-times"></i>
            </span>
          </h2>
          <div className={styles.balanceCard}>
            <div className="mb-3 d-flex justify-content-between">
              <h3 className="m-0 opacity-5">Available to claim</h3>
              <p className="mb-0">1,345 FTM</p>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <h3 className="m-0 opacity-5">FTM price</h3>
              <p className="mb-0">$ 20,966,562.71</p>
            </div>
          </div>
          <div className={classnames(styles.receiveRewards, 'my-5')}>
            <h2>You will receive</h2>
            <h1>13.92075 fUSD</h1>
            <p>
              The claimed rewards will be immediately available in your wallet.
            </p>
          </div>
          <div className={styles.passwordInput}>
            <Input
              type="password"
              label="Password"
              value=""
              handler={() => {}}
              isError=""
              errorMsg=""
            />
          </div>
          <div className="text-center">
            <Button color="primary">Claim now</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const SuccessModal = () => {
  return (
    <>
      <Modal isOpen={true} centered className={styles.successModal}>
        <ModalBody className={styles.modalBody}>
          <h2>Congratulations!</h2>
          <div className={styles.receiveRewards}>
            <h2>You successully claimed </h2>
            <h1>13.92075 fUSD</h1>
          </div>

          <div>
            <CheckCircleIcon />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default () => (
  <Card className="py-5">
    <div className="text-center">
      <InfoModal />
      <h2 className="mb-5">Claim your rewards</h2>
      <div
        className={classnames(
          styles.btnWrapper,
          'mx-auto d-flex justify-content-between'
        )}
      >
        <Button>Claim FTM</Button>
        <Button color="primary">Claim fUSD</Button>
        <ClaimfUSDModal />
        <SuccessModal />
      </div>
    </div>
  </Card>
);
