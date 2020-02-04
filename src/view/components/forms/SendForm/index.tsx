/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useCallback, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  Card,
  FormGroup,
  Label,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import DashboardInput from '../DashboardInput';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import {
  selectAccount,
  selectAccountTransfer,
} from '~/redux/account/selectors';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IModalChildProps } from '~/redux/modal/constants';
import { copyToClipboard } from '~/utility/clipboard';
import { IAccount } from '~/redux/account/types';
import { RouteComponentProps } from 'react-router';
import { estimationMaxFantomBalance } from '../../../general/utilities';
import * as ACTIONS from '~/redux/transactions/actions';
import FantomActive from '../../../../images/dashboard-icons/Archive/fantom-active.svg';
import EthereumActive from '../../../../images/dashboard-icons/Archive/ethereum-active.svg';
import BinanceActive from '../../../../images/dashboard-icons/Archive/binance-active.svg';
import XarActive from '../../../../images/dashboard-icons/Archive/xar-active.svg';
import Fantom from '../../../../images/dashboard-icons/Archive/fantom-inactive.svg';
import Ethereum from '../../../../images/dashboard-icons/Archive/ethereum-inactive.svg';
import Binance from '../../../../images/dashboard-icons/Archive/binance-inactive.svg';
import Xar from '../../../../images/dashboard-icons/Archive/xar-inactive.svg';

import Input from '../Input';
import {
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';

const destinantionChainData = [
  { icon: Fantom, activeIcon: FantomActive, title: 'Opera', isActive: true },
  {
    icon: Ethereum,
    activeIcon: EthereumActive,
    title: 'Ethereum',
    isActive: false,
  },
  {
    icon: Binance,
    activeIcon: BinanceActive,
    title: 'Binance',
    isActive: false,
  },
  { icon: Xar, activeIcon: XarActive, title: 'XAR', isActive: false },
];

const mapStateToProps = state => ({
  account: selectAccount(state),
  transfer: selectAccountTransfer(state),
});

const mapDispatchToProps = {
  accountSendFunds: ACCOUNT_ACTIONS.accountSendFunds,
  accountSendPasswordCheck: ACCOUNT_ACTIONS.accountSendPasswordCheck,
  accountTransferClear: ACCOUNT_ACTIONS.accountTransferClear,
  transactionsGetList: ACTIONS.transactionsGetList,
  accountSetTransferErrors: ACCOUNT_ACTIONS.accountSetTransferErrors,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  accountGetTransferFee: ACCOUNT_ACTIONS.accountGetTransferFee,
  accountSetTransfer: ACCOUNT_ACTIONS.accountSetTransfer,
  setTransactionDetails: ACTIONS.setTransactionDetails,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    address: string;
    data: { publicAddress: string; balance: string };
    transactionHash: string;
  };

const FANTOM_WEB_URL = 'https://explorer.fantom.network';

const TransferFunds: FC<IProps> = ({
  data = { balance: '0', publicAddress: '' },
  accountGetBalance,
  accountSendFunds,
  accountSendPasswordCheck,
  transactionsGetList,
  transfer,
  transactionHash,
  accountGetTransferFee,
  setTransactionDetails,
}) => {
  // const data =  accountData.list && address && accountData.list[address];
  const { t } = useTranslation();

  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [inProcess, setInProcess] = useState(false);
  const [sendingErrors, setErrors] = useState({
    amount: false,
    to: false,
    password: false,
    invalidAmount: false,
    maxBalance: false,
  });
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(false);
  const [isSendSucess, setIsSendSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [txId, setTxId] = useState('');
  const [errorPass, setError] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [transactionFee, setTransactionFee] = useState('0');

  const handleClearAll = useCallback(() => {
    setTo('');
    setAmount('');
    setMemo('');
    setErrors({
      maxBalance: false,
      amount: false,
      to: false,
      password: false,
      invalidAmount: false,
    });
  }, [setTo, setAmount, setMemo]);
  // const balance = parseFloat(data.balance)

  const handlePassword = useCallback(() => {
    const validation_errors = {
      invalidAmount:
        amount.indexOf('.') === 0 || amount.includes('-') || amount === '',
      amount: amount === '' || (amount || 0) > parseFloat(data.balance),
      to: to.length !== 42,
      password: false,
      maxBalance: false,
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);

    const fee = parseFloat(transactionFee) * 2;
    const totalAmount = Number(amount) + fee;
    if (totalAmount > Number(data.balance)) {
      setErrors({ ...sendingErrors, maxBalance: true });
      return;
    }
    setModal(true);
  }, [amount, data.balance, to.length, transactionFee, sendingErrors]);

  const renderSendFormSucess = (
    isSendSucess,
    errorType,
    publicAddress,
    onClick,
    t
  ) => {
    if (isSendSucess && errorType === '') {
      const hashValue = localStorage.getItem('txHash');
      return (
        <div>
          <Card className={classnames(styles.transCard, 'mb-5 mt-5')}>
            <h2>{t('transactionSent!')}</h2>
            <div className={classnames(styles.iconGap, styles.hash)}>
              <a
                target="_blank"
                href={`${FANTOM_WEB_URL}/transactions/${hashValue}`}
              >
                {hashValue}
              </a>
              <button
                className={styles.copyBtn}
                type="button"
                onClick={onClick}
              >
                <CopyIcon />
              </button>
            </div>
            <div>
              <CheckCircleIcon />
            </div>
          </Card>
        </div>
      );
    }
    if (errorType !== 'password' && sendFailed) {
      return (
        <div>
          <Card className={classnames(styles.transCard, 'mb-5')}>
            <h2 className={styles.iconGap}>
              {t('somethingWentWrong')}
              .
              <br />
              {t('pleaseTryAgain')}.
            </h2>
            <div>
              <ErrorCircleIcon />
            </div>
          </Card>
        </div>
      );
    }
    return null;
  };

  // const callback = (fee: string) => {

  // }

  useEffect(() => {
    const errors = Object.keys(transfer.errors);
    if (errors && errors.length === 0 && isSending) {
      setIsSendSuccess(true);
    }
    accountGetTransferFee(44000, fee => {
      setTransactionFee(fee);
    });
    // setIsInitial(true);
    // if (!isInitial && errors.includes('password')) {
    //   setModal(true);
    // }
  }, [
    accountGetTransferFee,
    isSending,
    password,
    setIsSending,
    setModal,
    transfer.errors,
  ]);

  let errorType = '';
  const errors = Object.keys(transfer.errors);
  // if(errors && errors.length === 0 && isSending){
  //   setIsSendSuccess(true)
  // }
  if (errors && errors.length > 0) {
    if (errors.includes('password')) {
      errorType = 'password';
    } else if (isSendSucess) {
      errorType = 'other';
    }
  }

  const sendSuccess = useCallback(() => {
    setIsSending(true);
    setModal(false);
  }, [setIsSending, setModal]);

  const call = (res: any) => {
    if (res) {
      setIsSending(true);
      setModal(false);
      setInProcess(false);
      setTransactionDetails(localStorage.getItem('txHash') || '', memo);
    } else {
      setSendFailed(true);
      setModal(false);
      setInProcess(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = (value: boolean) => {
    if (!value) {
      accountSendFunds(
        {
          to,
          from: data.publicAddress,
          amount,
          message: memo,
          password,
        },
        call
      );
    } else {
      setError(true);
      setInProcess(false);
    }
  };

  const handleSubmit = useCallback(() => {
    const validation_errors = {
      ...sendingErrors,
      password: password === '',
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);

    // const errorsas = Object.keys(transfer.errors);
    // console.log(errorsas, '****asdkas')
    setInProcess(true);
    setTimeout(() => {
      accountGetBalance(data.publicAddress);
      transactionsGetList(data.publicAddress);
    }, 4000);

    accountSendPasswordCheck(
      {
        to,
        from: data.publicAddress,
        amount,
        message: memo,
        password,
      },
      callback
    );
  }, [
    sendingErrors,
    password,
    amount,
    data.publicAddress,
    accountSendPasswordCheck,
    to,
    memo,
    callback,
    accountGetBalance,
    transactionsGetList,
  ]);

  const onClick = useCallback(
    event => copyToClipboard(event, localStorage.getItem('txHash') || ''),
    []
  );
  const getAmountErrorText = () => {
    const maxAmount = parseFloat(transactionFee) * 2;
    const balanceLeft = parseFloat(data.balance) - maxAmount;
    if (balanceLeft < 0) {
      return t('insufficentFundsTransfer');
    }
    if (sendingErrors.invalidAmount) {
      return t('invalidAmount');
    }
    // if (sendingErrors.amount){
    //   return 'This amount exceeds your balance. Please enter a lower amount'

    // }

    if (sendingErrors.maxBalance || sendingErrors.amount) {
      return `${t('canTransferMax')} ${balanceLeft.toFixed(
        6
      )} (Value + gas * price)`;
    }
  };

  return (
    <>
      {renderSendFormSucess(
        isSendSucess,
        errorType,
        data.publicAddress,
        onClick,
        t
      )}

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
            label={t('enterWalletPassword')}
            value={password}
            placeholder={t('enterPassword')}
            handler={value => {
              setPassword(value);
            }}
            // errorClass="justify-content-center"
            isError={errorType === 'password' || errorPass}
            errorMsg={
              errorType === 'password' || errorPass ? t('invalidPassword') : ''
            }
          />
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={inProcess}
              className={classnames('btn btn-secondary', styles.sendBtn)}
            >
              {inProcess ? t('sending') : t('send')}
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Row>
        <Col lg={8}>
          {!isSendSucess && !sendFailed && (
            <div className={classnames('card', styles.card)}>
              {/* <h2 className={styles.title}>{t('sendFTM')}</h2> */}
              <div className={styles.inputsWrapper}>
                <FormGroup className={styles.formGroup}>
                  <Label className={styles.label}>Select token</Label>
                  <div className={styles.selectWrapper}>
                    <select
                      className={classnames('form-control', styles.select)}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </FormGroup>
                <DashboardInput
                  label={t('amount')}
                  placeholder={t('enterAmount')}
                  rightLabel={t('entireBalance')}
                  value={amount}
                  handleRightButton={() => {
                    if (data.balance === '0') {
                      setAmount('0');
                    } else {
                      const maxAmount = parseFloat(transactionFee) * 2;
                      let balanceLeft = parseFloat(data.balance) - maxAmount;
                      if (balanceLeft < 0) {
                        balanceLeft = 0;
                      }
                      // estimationMaxFantomBalance(data.balance).then(value => {
                      //   setAmount(value);
                      // });
                      setAmount(balanceLeft.toString());
                    }
                    // const balance = data.balance === '0' ? 0 : data.balance;
                  }}
                  type="number"
                  handleChange={val => {
                    setAmount(val);
                    setErrors({
                      ...sendingErrors,
                      amount: false,
                      invalidAmount: false,
                      maxBalance: false,
                    });
                  }}
                  error={{
                    isError:
                      sendingErrors.amount ||
                      sendingErrors.invalidAmount ||
                      sendingErrors.maxBalance,
                    errorText: getAmountErrorText() || '',
                  }}
                />
                <DashboardInput
                  label={t('toAddress')}
                  value={to}
                  type="text"
                  handleChange={val => {
                    setTo(val);
                    setErrors({ ...sendingErrors, to: false });
                  }}
                  error={{
                    isError: sendingErrors.to,
                    errorText: t('enterValidFTMAddress'),
                  }}
                  placeholder={t('enterAddress')}
                />
                <div className="">
                  <label className={styles.label}>Destinantion chain</label>
                  <div className={styles.boxWrapper}>
                    {destinantionChainData.map(
                      ({ icon, activeIcon, title, isActive }) => (
                        <div
                          className={classnames(styles.box, {
                            [styles.active]: isActive,
                          })}
                        >
                          <img src={isActive ? activeIcon : icon} alt={title} />
                          <p>{title}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <DashboardInput
                  label={t('memoOptional')}
                  value={memo}
                  type="text"
                  placeholder={t('enterMemo')}
                  handleChange={setMemo}
                />
              </div>
              <div className={styles.btnWrapper}>
                <Button
                  color="topaz"
                  className={classnames({
                    outlined: true,
                    // 'text-dark-grey-blue': !is_next_disabled,
                  })}
                  onClick={handlePassword}
                >
                  {t('send')}
                </Button>
                <Button
                  color="topaz"
                  className={classnames(
                    styles.btn,
                    styles.clear,
                    'border-0 outlined'
                  )}
                  onClick={handleClearAll}
                >
                  {t('clearAll')}
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

const Transfer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferFunds);

export default Transfer;
