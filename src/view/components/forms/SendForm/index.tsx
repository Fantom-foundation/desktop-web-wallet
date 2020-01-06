/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useCallback, useEffect } from 'react';
import { Button, Modal, ModalBody, Card } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import DashboardInput from '../DashboardInput';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import {
  selectAccount,
  selectAccountTransfer,
} from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { IModalChildProps } from '~/redux/modal/constants';
import { copyToClipboard } from '~/utility/clipboard';
import { IAccount } from '~/redux/account/types';
import { RouteComponentProps } from 'react-router';
import { estimationMaxFantomBalance } from '../../../general/utilities';
import * as ACTIONS from '~/redux/transactions/actions';

import Input from '../Input';
import {
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';

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
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    address: string;
    data: { publicAddress: string; balance: string };
    transactionHash: string;
  };

const TransferFunds: FC<IProps> = ({
  data,
  accountGetBalance,
  accountSendFunds,
  accountSendPasswordCheck,
  transactionsGetList,
  transfer,
  transactionHash,
}) => {
  // const data =  accountData.list && address && accountData.list[address];

  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [inProcess, setInProcess] = useState(false)
  const [sendingErrors, setErrors] = useState({
    amount: false,
    to: false,
    password: false,
  });
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(false);
  const [isSendSucess, setIsSendSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [txId, setTxId] = useState('');
  const [errorPass, setError] = useState(false);
  const [sendFailed, setSendFailed] = useState(false)

  const handleClearAll = useCallback(() => {
    setTo('');
    setAmount('');
    setMemo('');
    setErrors({ amount: false, to: false, password: false });
  }, [setTo, setAmount, setMemo]);
  // const balance = parseFloat(data.balance)
  console.log(amount, typeof amount, '****adsasd');

  const handlePassword = useCallback(() => {
    const validation_errors = {
      amount:
        amount === '' ||
        (amount || 0) > parseFloat(data.balance) ,
      to: to.length !== 42,
      password: false,
    };
    console.log(validation_errors, '****validation_errors');

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);
    setModal(true);
  }, [data, to, amount]);

  const renderSendFormSucess = (
    isSendSucess,
    errorType,
    publicAddress,
    onClick
  ) => {
    if (isSendSucess && errorType === '') {
      return (
        <div>
          <Card className={classnames(styles.transCard, 'mb-5 mt-5')}>
            <h2>Transaction sent!</h2>
            <div className={classnames(styles.iconGap, styles.hash)}>
              <a href="#">{localStorage.getItem('txHash')}</a>
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
              Something went wrong.
              <br />
              Please try again.
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

  useEffect(() => {
    const errors = Object.keys(transfer.errors);
    if (errors && errors.length === 0 && isSending) {
      setIsSendSuccess(true);
    }
    // setIsInitial(true);
    console.log(password, '*****password');
    // if (!isInitial && errors.includes('password')) {
    //   setModal(true);
    // }
  }, [isSending, password, setIsSending, setModal, transfer.errors]);

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

  console.log(errorType, '****8errorType');

  const sendSuccess = useCallback(() => {
    setIsSending(true);
    setModal(false);
  }, [setIsSending, setModal]);

  const call = (res: any) => {
    if(res){
      setIsSending(true);
      setModal(false);
      setInProcess(false)
    } else {
      setSendFailed(true)
      setModal(false);
      setInProcess(false)

    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = (value: boolean) => {
    console.log(localStorage.getItem('txHash'), '****jasjdasdas');
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
      setInProcess(false)
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
    setInProcess(true)
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
    callback,
    sendingErrors,
    accountSendPasswordCheck,
    password,
    to,
    data.publicAddress,
    amount,
    memo,
    accountGetBalance,
    transactionsGetList,
  ]);

  const onClick = useCallback(
    event => copyToClipboard(event, transactionHash),
    [transactionHash]
  );

  return (
    <>
      {renderSendFormSucess(
        isSendSucess,
        errorType,
        data.publicAddress,
        onClick
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
            label="Please enter your wallet password to send the transaction"
            value={password}
            placeholder="Enter password"
            handler={value => {
              setPassword(value);
            }}
            // errorClass="justify-content-center"
            isError={errorType === 'password' || errorPass}
            errorMsg={
              errorType === 'password' || errorPass ? 'Invalid password' : ''
            }
          />
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={inProcess}
              className={classnames('btn btn-secondary', styles.sendBtn)}
            >
              {inProcess  ?  "Sending...": 'Send'}
            </button>
          </div>
        </ModalBody>
      </Modal>

      {!isSendSucess && !sendFailed &&  (
        <div className={classnames('card', styles.card)}>
          <h2 className={styles.title}>Send FTM</h2>
          <div className={styles.inputsWrapper}>
            <DashboardInput
              label="Amount"
              placeholder="Enter amount"
              rightLabel="Entire balance"
              value={amount}
              handleRightButton={() => {
                console.log(
                  data.balance,
                  typeof data.balance,
                  '***data.balance '
                );
                if (data.balance === '0') {
                  setAmount('0');
                } else {
                  estimationMaxFantomBalance(data.balance).then(value => {
                    setAmount(value);
                  });
                }
                const balance = data.balance === '0' ? 0 : data.balance;
              }}
              type="number"
              handleChange={val => {
                console.log('****typeof', val);
                setAmount(val);
                setErrors({ ...sendingErrors, amount: false });
              }}
              error={{
                isError: sendingErrors.amount,
                errorText:
                  'This amount exceeds your balance. Please enter a lower amount',
              }}
            />
            <DashboardInput
              label="To address"
              value={to}
              type="text"
              handleChange={val => {
                setTo(val);
                setErrors({ ...sendingErrors, to: false });
              }}
              error={{
                isError: sendingErrors.to,
                errorText: 'Enter a valid FTM address',
              }}
              placeholder="Enter address"
            />
            <DashboardInput
              label="Memo (optional)"
              value={memo}
              type="text"
              placeholder="Enter memo"
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
              Send
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
              Clear All
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const Transfer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferFunds);

export default Transfer;
