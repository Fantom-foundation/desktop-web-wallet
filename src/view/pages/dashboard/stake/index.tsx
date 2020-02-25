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
import WithdrawSuccess from '~/view/components/stake/withdrawSuccess';
import WithdrawalProgress from 'src/view/components/stake/withdrawalProgress';
import WithdrawSuccessfulCard from 'src/view/components/stake/withdrawalSuccessCard';
import { useTranslation } from "react-i18next";

import { connect } from 'react-redux';
import Input from '../../../components/forms/Input';
import { convertFTMValue } from '~/view/general/utilities';
import moment from 'moment';
import { copyToClipboard } from '~/utility/clipboard';

// import downloadIcon from
import {
  delegateByAddress as delegateByAddressAction,
  unstakeamount as unstakeamountAction,
  delegateAmount as delegateAmountAction,
  delegateAmountPassCheck as delegateAmountPass,
  withdrawAmount as withdrawAmountAction,
  withdrawAmountPassCheck as withdrawAmountPasswordCheck,
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
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passError, setPassError] = useState(false)
  const [withdrawalText, setWithdrawal] = useState('');
  const {
    stakes,
    id,
    error,
    delegateByAddress,
    accountData,
    accountGetBalance,
    delegateAmountPassCheck,
    withdrawAmountPassCheck,
    accountGetPrivateKey,
    accountGetTransferFee,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState('');
  const [inProcess, setInProcess] = useState(false)
  const [transactionFee ,setTransactionFee] = useState('')
  const account = accountData.list && id && accountData.list[id];

  const setTxFee = () => {
    const selectedAddress =
    stakes && stakes.length > 0
      ? stakes.find(stake => {
          return stake.publicKey === id.toLowerCase();
        })
      : [];
      const isDeligated = selectedAddress && selectedAddress.isDeligated;
    let gasValue = 200000
    if(isDeligated){
      gasValue = 150000
    }
    accountGetTransferFee(gasValue, fee => {
      setTransactionFee(fee)

    })

  }

  useEffect(() => {
    delegateByAddress({ publicKey: id });
    setTxFee()

    console.log("createtimeout kapil")
    const interval = setInterval(() => {
      if (!modal) {

        accountGetBalance(id);
        delegateByAddress({ publicKey: id });

      }
    }, 2000);
    return () => {console.log("cleartimeout kapil"); clearInterval(interval)};
  }, [accountGetBalance, accountGetTransferFee, modal, type, delegateByAddress, inProcess, id, setTransactionFee, setTxFee]);



  const handleStep = useCallback(
    actionType => {
      setStep(step + 1);
      if (actionType === 'stake') {
        setStep(step + 1);
      } else if (actionType === 'back') {
        setStep(1);
      } else {

        accountGetTransferFee(150000, fee => {
          setTransactionFee(fee)
    
        })

        setStep(5);
      }
    },
    [accountGetTransferFee, step]
  );

  const unStakeAmount = () => {
    const { unstakeamount, id } = props;
   
    unstakeamount({ publicKey: id, password  }, res => {
      if(res){
        setModal(false);
        setInProcess(false)
      } else {
        setStep(8);
        setModal(false);
        setInProcess(false)
      }

    });
    setTimeout(() => {
      accountGetBalance(id);
      setStep(9);
      delegateByAddress({ publicKey: id });
    }, 4000);
  };

  const call = (res: boolean) => {
    if (res) {
      setStep(8);
      setModal(false);
      setInProcess(false)

    } else {
      // setTimeout(() => {
      //   accountGetBalance(id);
      //   delegateByAddress({ publicKey: id });
      // }, 4000);
      setStep(7);
      setModal(false);
      setInProcess(false)

    }
    // setInProcess(false)
  };

  const callback = (res: boolean) => {
    const { delegateAmount } = props;
    if (!res) {
     
      delegateAmount(
        {
          publicKey: id,
          amount: stakeValue,
          validatorId: validator.id,
          password,
        },
        call
      );
     
    } else {
      setPassError(true);
      setInProcess(false)

    }
  };

  const stakeAmount = () => {
    delegateAmountPassCheck(
      {
        publicKey: id,
        amount: stakeValue,
        validatorId: validator.id,
        password,
      },
      callback
    );
    setInProcess(true)
    // setTimeout(() => {
    //   accountGetBalance(id);
    // }, 2000);
  };

  const unStakeAmountPass = () => {
    setInProcess(true)
    // setTxFee()
    

    delegateAmountPassCheck(
      {
        publicKey: id,
        amount: stakeValue,
        validatorId: validator.id,
        password,
      },
      (res: boolean) => {
        if (!res) {

          unStakeAmount();
        } else {
          setInProcess(false)
        }
      }
    );
  };

  const handleStackSubmit = useCallback(() => {
    const validation_errors = {
      stakeValueMin: parseFloat(stakeValue) < 1,
      stakeValueInvalid:
        stakeValue === '' || stakeValue === undefined || stakeValue === null,
      stakeValueMax: parseFloat(stakeValue) > account.balance,
      maxBalance: false,
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);

      const fee = parseFloat(transactionFee) * 2
      const totalAmount = Number(stakeValue) + fee
      if(totalAmount > Number(account.balance)){
        setErrors({ ...errors, maxBalance: true})
        return 
      }





    if (isEdit) {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  }, [account.balance, errors, isEdit, stakeValue, step, transactionFee]);


  const onWithdrawAmount = () => {
    const { withdrawAmount, id } = props;
    withdrawAmount({ publicKey: id, password }, res => {
      if(res){
        setInProcess(false);
        setStep(10)
        setModal(false)
       

      } else {
        setStep(8);
        setModal(false)
        setInProcess(false);

      }
    });
    // setTimeout(() => {
    //   delegateByAddress({ publicKey: id });
    //   accountGetBalance(id);

    // }, 4000);
   
  };

  const handlePasswordCheckForWithdraw = () => {
    setInProcess(true)
    withdrawAmountPassCheck({ publicKey: id, password }, res => {
      if(res){
        setPassError(true)
        setInProcess(false)

      } else {
        onWithdrawAmount()

      }

    })


  }
  // console.log(stakes[0].publicKey,id,  '********stakes')

  const selectedAddress =
    stakes && stakes.length > 0
      ? stakes.find(stake => {
          return stake.publicKey === id.toLowerCase();
        })
      : [];
      selectedAddress && selectedAddress.isDeligated;

  const getCurrentCard = () => {
    const maxAmount = parseFloat(transactionFee) * 2
                  const balanceLeft = parseFloat(account.balance) - maxAmount
    switch (step) {
      case 1:
        return (
          <StackUnstack
            t={t}
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
            balanceLeft={balanceLeft}
            errors={errors}
            handleEntireBalance={() => {
              let bal = balanceLeft
              if(balanceLeft < 0){
                bal = 0

              }
                  setStakeValue(bal.toString());
              }}
            validatorBtn={styles.validatorBtn}
            handleStep={() => handleStackSubmit()}
          />
        );
      case 3:
        return (
          <StakeValidators
            t={t}
            handleValidatorSelect={val => {
              setValidator(val);
              setStep(step + 1);
              setType('stake');
            }}
            balance={account.balance}
          />
        );
      case 4:
        return (
          <StakeSummaryCard
            t={t}
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
            t={t}
            handleStep={handleStep}
            handleModal={event => {
              const fee = parseFloat(transactionFee) * 2;
    const totalAmount = Number(stakeValue) + fee;
    if(totalAmount > Number(account.balance)){
      // setErrors({ ...errors, maxBalance: true})
      const text = ""

      copyToClipboard(event, account.publicAddress, text,t, true, fee)
      return 
    } 
    setModal(true);
              setType('unStake')
            }}
          />
        );
      case 6:
        return <StackUnstack handleStep={handleStep} t={t} />;
      case 7:
        return (
          <SuccessCard t={t} cardCss={styles.transCard} iconGapCss={styles.iconGap} />
        );
      case 8:
        return (
          <FailureCard t={t} cardCss={styles.transCard} iconGapCss={styles.iconGap} />
        );
      case 9:
        return (
          <WithdrawSuccess
            t={t}
            cardCss={styles.transCard}
            iconGapCss={styles.iconGap}
          />
        );

        case 10:
        return (
          <WithdrawSuccessfulCard
            t={t}
            cardCss={styles.transCard}
            iconGapCss={styles.iconGap}
          />
        );
      default:
        break;
    }
  };

  const getButtonTitle = () => {
    if(type === 'stake'){
      if(inProcess){
        return t("staking")
      }
      return t("stake")
    } 
     if (type === 'unStake'){
      if(inProcess){
        return t("unstaking")
      }
      return t("unstake")

    }
    if (type === 'withdraw'){
      if(inProcess){
        return t("withdrawing")
      }
      return t("withdraw")

    }
  }

  // eslint-disable-next-line react/no-multi-comp
  const renderModal = () => {
    return (
      <Modal
        isOpen={modal}
        className={classnames('modal-dialog-centered', styles.passwordModal)}
        toggle={() => {
          setModal(false), setPassword(''), setInProcess(false);
        }}
      >
        <ModalBody className={styles.body}>
          <Input
            type="password"
            label={`${t('enterWalletPasswordModal')} ${type === 'stake' ? t('stake'): type === 'withdraw' ? t('withdraw') : t('unstake')}`}
            value={password}
            placeholder={t("enterPassword")}
            handler={value => {
              setPassword(value);
            }}
            // errorClass="justify-content-center"
            isError={passError || error}
            errorMsg={passError || error ? t("invalidPassword") : ''}
          />
          <div className="text-center">
            <button
              type="button"
              disabled={inProcess}
              onClick={e => {
                if (type === 'stake') {
                  stakeAmount();
                } else if (type === 'withdraw'){
                  handlePasswordCheckForWithdraw()
                }
                
                else {
                  unStakeAmountPass();
                }
              }}
              className={classnames('btn btn-secondary', styles.sendBtn)}
            >
              { getButtonTitle()}
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  };



  const withdrawalStakeCard = () => {
    const selectedAddress =
      stakes && stakes.length > 0
        ? stakes.find(stake => {
            return stake.publicKey === id.toLowerCase();
          })
        : [];


    const deactivatedEpoch = Number(
      (selectedAddress && selectedAddress.deactivatedEpoch) || 0
    );
    const deactivatedTime = Number(
      (selectedAddress && selectedAddress.deactivatedTime) || 0
    );

    const date1 = new Date(deactivatedTime * 1000);
    date1.setDate(date1.getDate() + 7);
    const date2 = new Date();
    const startTime = moment(date1, 'YYYY/MM/DD HH:mm');
    const endTime = moment(date2, 'YYYY/MM/DD HH:mm');

    const timeLeft = startTime.diff(endTime, 'hours', true);
    // parseFloat(Web3.utils.fromWei(selectedAddress.stakedAmount)).toFixed(5)}
    const stakedAmount = parseFloat(
      Web3.utils.fromWei(
        (selectedAddress && selectedAddress.stakedAmount) || '0'
      )
    ).toFixed(2);
    if (selectedAddress && timeLeft > 0) {
      return (
        <>
          <Row>
            <Col>
              <Card className="text-center">
                <div className={styles.availableWrapper}>
                  <h3 className="mb-0">
                    {`${t('your')} ${stakedAmount} ${t('FTMAvail')} ${
                      timeLeft / 24 > 0
                        ? `${Math.floor(timeLeft / 24)  } ${t('daysAnd')}`
                        : ''
                    }  ${Math.floor(timeLeft % 24)} ${t('hours')}`}
                  </h3>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    if (deactivatedEpoch > 0 && timeLeft < 0 && step !== 10) {
      return (
        <Row>
          <Col>
            <Card className="text-center">
              <div className={styles.availableWrapper}>
                <h3 className="mb-0">
                  {t('your')}
                  {' '}
                  {stakedAmount}
                  {' '}
                  {t('FTMAvail')}
                </h3>
                <button
                  onClick={event => { 
                  const fee = parseFloat(transactionFee) * 2;
    const totalAmount = Number(stakeValue) + fee;
    if(totalAmount > Number(account.balance)){
      // setErrors({ ...errors, maxBalance: true})
      const text = "copiedClipboard"

      copyToClipboard(event, account.publicAddress,text,t, true, fee, true)
      return 
    } 
    setModal(true);
              setType('withdraw')
              }}
                  type="button"
                >
                  {t('withdrawToWallet')}
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

    const deactivatedEpoch = Number(
      (selectedAddress && selectedAddress.deactivatedEpoch) || 0
    );
    const deactivatedTime = Number(
      (selectedAddress && selectedAddress.deactivatedTime) || 0
    );

    const date1 = new Date(deactivatedTime * 1000);
    date1.setDate(date1.getDate() + 7);
    const date2 = new Date();
    const startTime = moment(date1, 'YYYY/MM/DD HH:mm');
    const endTime = moment(date2, 'YYYY/MM/DD HH:mm');

    const timeLeft = startTime.diff(endTime, 'hours', true);
    // parseFloat(Web3.utils.fromWei(selectedAddress.stakedAmount)).toFixed(5)}
  




  const stakeDetails =
    stakes && stakes.length > 0
      ? stakes.find(stake => {
          return stake.publicKey === id.toLowerCase();
        })
      : [];

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
            <p className="card-label mb-4">{t("overview")}</p>
            <div className="text-right">
              <h2 className="pt-3">
                {convertFTMValue(parseFloat(account.balance))}
                {' '}
FTM
              </h2>
              <h3 className="opacity-5 mb-3">{t("availableStake")}</h3>
              <h2 className="pt-3"> 
                {' '}
                {stakedAmount}
                {' '}
FTM
              </h2>
              <h3 className="opacity-5 mb-3">{t("currentlyStaking")}</h3>
            </div>
          </Card>
        </Col>

        <Col md={6} className="mb-6">
          <Card className="h-100 ">
            <p className="card-label mb-4">{t("rewards")}</p>
            <div className="text-right">
              <h2 className="pt-3">
                {claimedRewards}
                {' '}
FTM
              </h2>
              <h3 className="opacity-5 mb-3">{t("claimedRewards")}</h3>
              <h2 className="pt-3">
                {pendingRewards}
                {' '}
FTM
              </h2>
              <h3 className="opacity-5 mb-3">{t("availableClaim")}</h3>
            </div>
          </Card>
        </Col>
      </Row>
      {withdrawalStakeCard()}
      <Row className={(deactivatedEpoch > 0 && timeLeft < 0) || (selectedAddress && timeLeft > 0) ? 'mt-6':''}>
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
  accountGetTransferFee: ACCOUNT_ACTIONS.accountGetTransferFee,
  withdrawAmount: withdrawAmountAction,
  withdrawAmountPassCheck: withdrawAmountPasswordCheck,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stake);
