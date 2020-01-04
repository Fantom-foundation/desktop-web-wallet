/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-multi-comp */
import React, { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card, Modal, ModalBody } from 'reactstrap';
import { StakeSummaryCard } from 'src/view/components/cards';
import StakeValidators from 'src/view/components/stakeValidators';
import StackUnstack from 'src/view/components/stake/stakeUnstake';
import StakeInput from 'src/view/components/stake/stakeInput';
import UnstakeDecisionCard from 'src/view/components/stake/unstakeDecisionCard';
import SuccessCard from '~/view/components/stake/sucessCard';
import WithdrawalProgress from 'src/view/components/stake/withdrawalProgress';
import { connect } from 'react-redux';
import Input from '../../../components/forms/Input';
import { convertFTMValue } from '~/view/general/utilities';
import moment from 'moment';
// import downloadIcon from
import {
  delegateByAddress as delegateByAddressAction,
  unstakeamount as unstakeamountAction,
  delegateAmount as delegateAmountAction,
  delegateAmountPassCheck as delegateAmountPass,
  withdrawAmount as withdrawAmountAction,
} from '~/redux/stake/actions';
import FailureCard from '~/view/components/stake/failureCard';
import { selectAccount } from '~/redux/account/selectors';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import classnames from 'classnames';
import Web3 from 'web3';

const Stake = props => {
  const [stakeValue, setStakeValue] = useState('');
  const [validator, setValidator] = useState({
    name: '',
    id: '',
  });
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [withdrawalText, setWithdrawal] = useState('');
  const {
    stakes,
    id,
    error,
    delegateByAddress,
    accountData,
    accountGetBalance,
    delegateAmountPassCheck,
    accountGetPrivateKey,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const account = accountData.list && id && accountData.list[id];

  useEffect(() => {
    accountGetBalance(id);
  }, [accountGetBalance, id]);

  const handleStep = useCallback(
    actionType => {
      setStep(step + 1);
      if (actionType === 'stake') {
        setStep(step + 1);
      } else if (actionType === 'back') {
        setStep(1);
      } else {
        setStep(5);
      }
    },
    [step]
  );

  useEffect(() => {
    delegateByAddress({ publicKey: id });
  }, [delegateByAddress, id]);

  const unStakeAmount = value => {
    const { unstakeamount, id } = props;

    unstakeamount({ publicKey: id, isUnstake: value });
  };

  const call = (res: boolean) => {
    if (res) {
      setStep(8)
      setModal(false)
    }
  }

  const callback = (res: boolean) => {
    const { delegateAmount } = props;
    if (!res) {
      setStep(7)
      setModal(false)
      delegateAmount({
        publicKey: id,
        amount: stakeValue,
        validatorId: validator.id,
        password,
      }, call);
      setTimeout(() => {
        accountGetBalance(id);
        delegateByAddress({ publicKey: id });
      }, 4000);
    }
  }

  

  const stakeAmount = () => {
    delegateAmountPassCheck({
      publicKey: id,
      amount: stakeValue,
      validatorId: validator.id,
      password,
    }, callback);

    setTimeout(() => {
      setModal(false);
      setStep(7);
      accountGetBalance(id);
    }, 2000);
  };

  const handleStackSubmit = useCallback(() => {
    const validation_errors = {
      stakeValueMin: parseFloat(stakeValue) < 1,
      stakeValueInvalid:
        stakeValue === '' || stakeValue === undefined || stakeValue === null,
      stakeValueMax: parseFloat(stakeValue) > account.balance,
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);
    if (isEdit) {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  }, [account.balance, isEdit, stakeValue, step]);
  // console.log(stakes[0].publicKey,id,  '********stakes')

  const selectedAddress =
    stakes && stakes.length > 0
      ? stakes.find(stake => {
          console.log(stake.publicKey, id, '***8sds');
          return stake.publicKey === id.toLowerCase();
        })
      : [];
  console.log(selectedAddress, '****selectedAddress');

  const getCurrentCard = () => {
    switch (step) {
      case 1:
        return (
          <StackUnstack
            handleStep={handleStep}
            selectedAddress={selectedAddress}
          />
        );
      case 2:
        return (
          <StakeInput
            stakeValue={stakeValue}
            handleChange={val => {
              setStakeValue(val), setErrors({});
            }}
            errors={errors}
            handleEntireBalance={() => setStakeValue(account.balance)}
            validatorBtn={styles.validatorBtn}
            handleStep={handleStackSubmit}
          />
        );
      case 3:
        return (
          <StakeValidators
            handleValidatorSelect={val => {
              setValidator(val);
              setStep(step + 1);
            }}
            balance={account.balance}
          />
        );
      case 4:
        return (
          <StakeSummaryCard
            validator={validator.name}
            stakeValue={stakeValue}
            stakeAmount={() => setModal(true)}
            handleEditStep={val => {
              if (val === 2) {
                setIsEdit(true);
              }
              setStep(val);
            }}
          />
        );
      case 5:
        return (
          <UnstakeDecisionCard
            handleStep={handleStep}
            unStakeAmount={value => unStakeAmount(value)}
          />
        );
      case 6:
        return <StackUnstack handleStep={handleStep} />;
      case 7:
        return <SuccessCard cardCss={styles.transCard} iconGapCss={styles.iconGap} />;
      case 8:
          return <FailureCard cardCss={styles.transCard} iconGapCss={styles.iconGap} />;
      default:
        break;
    }
  };

  // eslint-disable-next-line react/no-multi-comp
  const renderModal = () => {
    return (
      <Modal
        isOpen={modal}
        className={classnames('modal-dialog-centered', styles.passwordModal)}
        toggle={() => setModal(false)}
      >
        <ModalBody className={styles.body}>
          <Input
            type="password"
            label="Please enter your wallet password to send the transaction"
            value={password}
            placeholder="Enter password"
            handler={value => {
              setPassword(value);
            }}
            // errorClass="justify-content-center"
            isError={error}
            errorMsg={error ? 'Invalid password' : ''}
          />
          <div className="text-center">
            <button
              type="button"
              onClick={stakeAmount}
              className={classnames('btn btn-secondary', styles.sendBtn)}
            >
              Send
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  const onWithdrawAmount = () => {
    const { withdrawAmount, id } = props;

    withdrawAmount({ publicKey: id });
  };

  const withdrawalStakeCard = () => {
    const selectedAddress =
      stakes && stakes.length > 0
        ? stakes.find(stake => {
            console.log(stake.publicKey, id, '***8sds');
            return stake.publicKey === id.toLowerCase();
          })
        : [];

    const deactivatedEpoch = Number(selectedAddress.deactivatedEpoch || 0);
    const deactivatedTime = Number(selectedAddress.deactivatedTime || 0);

    const date1 = new Date(deactivatedTime * 1000);
    date1.setDate(date1.getDate() + 7);
    const date2 = new Date();
    const startTime = moment(date1, 'YYYY/MM/DD HH:mm');
    const endTime = moment(date2, 'YYYY/MM/DD HH:mm');

    const timeLeft = startTime.diff(endTime, 'hours', true);
    // parseFloat(Web3.utils.fromWei(selectedAddress.stakedAmount)).toFixed(5)}
    const stakedAmount = parseFloat(
      Web3.utils.fromWei(selectedAddress.stakedAmount || '0')
    ).toFixed(5);
    if (selectedAddress && timeLeft > 0) {
      return (
        <>
          <Row className="mt-6">
            <Col>
              <Card className="text-center">
                <div className={styles.availableWrapper}>
                  <h3 className="mb-0">
                    {`Your ${stakedAmount} FTM will be available in ${
                      timeLeft / 24 > 0
                        ? Math.floor(timeLeft / 24) + ' days and'
                        : ''
                    }  ${Math.ceil(timeLeft % 24)} hours`}
                  </h3>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    if (deactivatedEpoch > 0 && timeLeft < 0) {
      return (
        <Row className="mt-6">
          <Col>
            <Card className="text-center">
              <div className={styles.availableWrapper}>
                <h3 className="mb-0">Your {stakedAmount} FTM are available!</h3>
                <button onClick={() => onWithdrawAmount()} type="button">
                  Withdraw to your wallet now
                  {/* <img src={downloadIcon} alt="download" /> */}
                </button>
              </div>
            </Card>
          </Col>
        </Row>
      );
    }
    return null;
  };
  const stakeDetails =
    stakes && stakes.length > 0
      ? stakes.find(stake => {
          console.log(stake, id, '***8sds');
          return stake.publicKey === id.toLowerCase();
        })
      : [];
  console.log('***stakeDetails', stakeDetails);

  const stakedAmount = stakeDetails
    ? parseFloat(Web3.utils.fromWei(stakeDetails.stakedAmount || '0')).toFixed(
        2
      )
    : '0';
  const claimedRewards = stakeDetails
    ? stakeDetails.claimedRewards === '0'
      ? 0
      : parseFloat(
          Web3.utils.fromWei(stakeDetails.claimedRewards || '0')
        ).toFixed(2)
    : '0';
  const pendingRewards = stakeDetails
    ? stakeDetails.pendingRewards === '0'
      ? 0
      : convertFTMValue(parseFloat(stakeDetails.pendingRewards))
    : '0';

  return (
    <div>
      <Row>
        <Col md={6} className="mb-6">
          <Card className="h-100">
            <p className="card-label mb-4">Overview</p>
            <div className="text-right">
              <h2 className="pt-3">
                {convertFTMValue(parseFloat(account.balance))} FTM
              </h2>
              <h3 className="opacity-5 mb-3">Available to stake</h3>
              <h2 className="pt-3"> {stakedAmount} FTM</h2>
              <h3 className="opacity-5 mb-3">Currently staking</h3>
            </div>
          </Card>
        </Col>

        <Col md={6} className="mb-6">
          <Card className="h-100 ">
            <p className="card-label mb-4">Rewards</p>
            <div className="text-right">
              <h2 className="pt-3">{claimedRewards} FTM</h2>
              <h3 className="opacity-5 mb-3">Claimed rewards</h3>
              <h2 className="pt-3">{pendingRewards} FTM</h2>
              <h3 className="opacity-5 mb-3">Available to claim</h3>
            </div>
          </Card>
        </Col>
      </Row>
      {withdrawalStakeCard()}
      <Row className="mt-6">
        <Col>
          {withdrawalText ? (
            <WithdrawalProgress withdrawalText={withdrawalText} />
          ) : (
            getCurrentCard()
          )}
        </Col>
      </Row>

      {renderModal()}
    </div>
  );
};

const mapStateToProps = state => ({
  stakes: state.stakes.data,
  error: state.stakes.errors,
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  delegateByAddress: delegateByAddressAction,
  unstakeamount: unstakeamountAction,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  delegateAmount: delegateAmountAction,
  delegateAmountPassCheck: delegateAmountPass,
  withdrawAmount: withdrawAmountAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stake);
