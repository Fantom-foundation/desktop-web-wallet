import React, { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { IModalChildProps } from '~/redux/modal/constants';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import * as styles from './styles.module.scss';
import { PanelButton } from '~/view/components/panels/PanelButton';
import { TextInput } from '~/view/components/inputs/TextInput';
import { Textarea } from '~/view/components/inputs/Textarea';
import { Select } from '~/view/components/inputs/Select';
import { selectModal } from '~/redux/modal/selectors';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import image_address from '~/images/address.svg';
import image_amount from '~/images/amount.svg';
import image_password from '~/images/password.svg';
import image_from from '~/images/withdraw.svg';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { FaIcon } from '~/view/components/inputs/FaIcon';

const mapStateToProps = state => ({
  modal: selectModal(state),
  account: selectAccount(state),
});

const mapDispatchToProps = {
  accountSendFunds: ACCOUNT_ACTIONS.accountSendFunds,
  accountTransferClear: ACCOUNT_ACTIONS.accountTransferClear,
  accountSetTransferErrors: ACCOUNT_ACTIONS.accountSetTransferErrors,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};

type IProps = IModalChildProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const TransferModalUnconnected: FC<IProps> = ({
  account: {
    list,
    transfer: { errors, is_sent, is_processing },
  },
  onClose,
  accountSendFunds,
  accountTransferClear,
  accountSetTransferErrors,
  accountGetBalance,
}) => {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('0');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const senders = useMemo(
    () => Object.entries(list).reduce((obj, [id, account]) => ({ ...obj, [id]: account.name }), {}),
    [list]
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      accountSendFunds({ to, from, amount: parseFloat(amount), message, password });
    },
    [accountSendFunds, to, from, amount, password, message]
  );

  const onSendErrorReveal = useCallback(() => {
    accountSetTransferErrors({});
  }, [accountSetTransferErrors]);

  useEffect(() => {
    if (Object.keys(errors).length) accountSetTransferErrors({});
  }, [to, from, amount, password, message]);

  useEffect(() => {
    if (from && list.hasOwnProperty(from)) accountGetBalance(from);
  }, [from]);

  const balance = useMemo(() => {
    const account = from && list[from];

    if (!account) return null;
    if (account.is_loading_balance) return null;

    return `${list[from].balance} FTM`;
  }, [from]);

  return (
    <form className={styles.wrap} onSubmit={onSubmit} autoComplete="off">
      <h2>Transfer</h2>

      <PanelTitle
        title="Send Funds"
        right={<PanelButton icon="fa-sync-alt" spin={is_processing} type="button" />}
      />

      <div className={styles.form}>
        <div className={styles.item}>
          <TextInput
            name="to"
            placeholder="Enter address"
            label="To address"
            value={to}
            handler={setTo}
            icon={image_address}
            disabled={is_processing}
            type="text"
          />

          {errors.to && <div className={styles.error}>{errors.to}</div>}
        </div>

        <div className={styles.item}>
          <Select
            label="Withdraw from"
            options={senders}
            handler={setFrom}
            placeholder="Select account"
            value={from}
            icon={image_from}
            disabled={is_processing}
            right={balance}
          />

          {errors.from && <div className={styles.error}>{errors.from}</div>}
        </div>

        <div className={styles.item}>
          <TextInput
            name="data-amount"
            placeholder=""
            label="Amount"
            value={amount}
            handler={setAmount}
            icon={image_amount}
            disabled={is_processing}
            type="number"
            autoComplete="nope"
          />

          {errors.balance && <div className={styles.error}>{errors.balance}</div>}
          {errors.amount && <div className={styles.error}>{errors.amount}</div>}
        </div>

        <div className={styles.item}>
          <TextInput
            name="password"
            placeholder="Password for account"
            label="Enter password"
            value={password}
            handler={setPassword}
            type="password"
            icon={image_password}
            disabled={is_processing}
            autoComplete="new-password"
          />

          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>

        <div className={styles.item}>
          <Textarea
            name="note"
            placeholder="Optional message"
            label="Note"
            value={message}
            handler={setMessage}
            disabled={is_processing}
          />
        </div>

        <div className={styles.button}>
          <Button color="primary bordered" type="submit" disabled={is_processing}>
            Continue
          </Button>

          <Button color="secondary bordered" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>

        <DialogInfo
          title="Success!"
          body="Transfer complete"
          onClose={accountTransferClear}
          isOpened={is_sent}
        />

        <DialogInfo
          title="Error"
          body={errors.send}
          onClose={onSendErrorReveal}
          isOpened={!!errors.send}
        />
      </div>
    </form>
  );
};

const TransferModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferModalUnconnected);

export { TransferModal };
