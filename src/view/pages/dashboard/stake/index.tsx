import React, { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card } from 'reactstrap';
import { StakeSummaryCard } from 'src/view/components/cards';
import StakeValidators from 'src/view/components/stakeValidators';
import StackUnstack from 'src/view/components/stake/stakeUnstake';
import StakeInput from 'src/view/components/stake/stakeInput';
import FailureCard from 'src/view/components/stake/failureCard';
import UnstakeDecisionCard from 'src/view/components/stake/unstakeDecisionCard';
import ClaimRewardsCard from 'src/view/components/stake/claimRewardsCard';
import SuccessCard from '~/view/components/stake/sucessCard';
import WithdrawalProgress from 'src/view/components/stake/withdrawalProgress';
import { setValidatorsList } from '~/redux/stake/handlers';
import { connect } from 'react-redux';
import downloadIcon from 'src/images/icons/download-blue-icon.svg';
import { convertFTMValue } from '~/view/general/utilities';
import {
  delegateByAddress as delegateByAddressAction,
  unstakeamount as unstakeamountAction,
  delegateAmount as delegateAmountAction,
} from '~/redux/stake/actions';
import { selectAccount } from '~/redux/account/selectors';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const overViewMock = [
  { title: 'Available to stake', value: '200,756,680.84 FTM' },
  { title: 'Currently staking', value: '0 FTM' },
];
const rewardMock = [
  { title: 'Claimed rewards', value: '0 FTM' },
  { title: 'Available to claim', value: '0 FTM' },
];
const Stake = props => {
  const [stakeValue, setStakeValue] = useState('');
  const [validator, setValidator] = useState({
    name: '',
    id: '',
  });
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});
  const [withdrawalText, setWithdrawal] = useState('');
  const {
    stakes,
    id,
    delegateByAddress,
    accountData,
    accountGetBalance,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const account = accountData.list && id && accountData.list[id];
  // console.log(accountData, '****acc')
  useEffect(() => {
    accountGetBalance(id);
  }, [accountGetBalance, id]);
  const handleStep = useCallback(
    actionType => {
      setStep(step + 1);
      if (actionType === 'stake') {
        setType(actionType);
        setStep(step + 1);
      } else {
        if (actionType === 'back') {
          setStep(1);
        } else {
          setStep(5);
        }
      }
    },
    [step]
  );

  useEffect(() => {
    delegateByAddress({ publicKey: id });
  }, []);

  const unStakeAmount = value => {
    const { unstakeamount, id } = props;
    unstakeamount({ publicKey: id, isUnstake: value });
  };

  const stakeAmount = () => {
    const { delegateAmount } = props;
    delegateAmount({
      publicKey: id,
      amount: stakeValue,
      validatorId: validator.id,
    });
  };

  const handleStackSubmit = useCallback(() => {
    const validation_errors = {
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
  }, [stakeValue, step]);

  const selectedAddress =
    stakes && stakes.length > 0
      ? stakes.find(stake => stake.publicKey === id)
      : [];
  const getCurrentCard = () => {
    const { stakes, id } = props;
    const selectedAddress =
      stakes && stakes.find(stake => stake.publicKey === id);
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
          />
        );
      case 4:
        return (
          <StakeSummaryCard
            validator={validator.name}
            stakeValue={stakeValue}
            stakeAmount={stakeAmount}
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
      default:
        break;
    }
  };

  const withdrawalInProgress = () => {
    let text = 'Withdrawal in progress';

    setTimeout(() => {
      text = 'Withdrawal successful! The tokens are now in your wallet';
      setWithdrawal(text);
    }, 1000);
    setTimeout(() => {
      setWithdrawal('');
      setStep(1);
      unStakeAmount(false);
    }, 2000);
    setWithdrawal(text);
  };

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
              <h2 className="pt-3">0 FTM</h2>
              <h3 className="opacity-5 mb-3">Currently staking</h3>
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
      {!withdrawalText && (
        <>
          {selectedAddress && selectedAddress.isAmountUnstaked && (
            <Row className="mt-6">
              <Col>
                <Card className="text-center">
                  <div className={styles.availableWrapper}>
                    <h3 className="mb-0">
                      Your 322,456 FTM will available in 71 hours and 59
                      minutes.
                    </h3>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
          {selectedAddress && selectedAddress.isAmountUnstaked && (
            <Row className="mt-6">
              <Col>
                <Card className="text-center">
                  <div className={styles.availableWrapper}>
                    <h3 className="mb-0">Your 322,456 FTM are available!</h3>
                    <button type="button" onClick={withdrawalInProgress}>
                      Withdraw to your wallet now
                      {/* <img src={downloadIcon} alt="download" /> */}
                    </button>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
      <Row className="mt-6">
        <Col>
          {!!withdrawalText ? (
            <WithdrawalProgress withdrawalText={withdrawalText} />
          ) : (
            getCurrentCard()
          )}
        </Col>
      </Row>
      {/* <Row className="mt-6">
        <Col>
          <StackUnstack handleStep={handleStep} />
        </Col>
      </Row> */}
      {/* <Row>
        <Col>
          <StakeValidators />
        </Col>
      </Row>
     */}
      {/* <Row className="mt-6">
        <Col>
          <StakeInput 
            stakeValue={stakeValue} 
            setStakeValue={setStakeValue}
            validatorBtn={styles.validatorBtn}
            handleStep={handleStep}

          />
        </Col>
      </Row> */}
      {/* <Row className="mt-6">
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
      </Row> */}
      {/* <Row className="mt-6">
        <Col>
          <StakeSummaryCard />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <SuccessCard cardCss={styles.card} iconGapCss={styles.iconGap} />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <FailureCard cardCss={styles.card} iconGapCss={styles.iconGap} />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <UnstakeDecisionCard />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <ClaimRewardsCard styles={styles} />
        </Col>
      </Row> */}
    </div>
  );
};

const mapStateToProps = state => ({
  stakes: state.stakes.data,
  accountData: selectAccount(state),
});

const mapDispatchToProps = () => ({
  delegateByAddress: delegateByAddressAction,
  unstakeamount: unstakeamountAction,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  delegateAmount: delegateAmountAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stake);
