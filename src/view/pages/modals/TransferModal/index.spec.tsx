import React, { useCallback, useState } from 'react';
import { mount } from 'enzyme';
import { TransferModalUnconnected } from '.';
import styles from './styles.scss';
import { ACCOUNT_INITIAL_STATE } from '~/redux/account';
import { MODAL_INITIAL_STATE } from '~/redux/modal';
import { accountGetBalance } from '~/redux/account/actions';

describe('TransferModal', () => {
  const account = {
    ...ACCOUNT_INITIAL_STATE,
    transfer: {
      ...ACCOUNT_INITIAL_STATE.transfer,
      errors: {
        to: 'ERROR',
        from: 'ERROR',
        balance: 'ERROR',
        amount: 'ERROR',
        password: 'ERROR',
      },
    },
  };
  const modal = { ...MODAL_INITIAL_STATE };

  const onClose = jest.fn();
  const accountSendFunds = jest.fn();
  const accountTransferClear = jest.fn();
  const accountSetTransferErrors = jest.fn();
  const accountGetBalance = jest.fn();

  const wrapper = mount(
    <TransferModalUnconnected
      account={account}
      modal={modal}
      accountGetBalance={accountGetBalance}
      accountSendFunds={accountSendFunds}
      accountSetTransferErrors={accountSetTransferErrors}
      accountTransferClear={accountTransferClear}
      onClose={onClose}
    />
  );

  it('mounts', () => {
    expect(wrapper.find(`.${styles.wrap}`).length).toBe(1);
  });

  it('handles submit click', () => {
    wrapper.find(`form`).simulate('submit');

    expect(accountSendFunds.mock.calls.length).toBe(1);
    expect(accountSendFunds.mock.calls[0][0]).toEqual({
      amount: 0,
      from: '',
      message: '',
      password: '',
      to: '',
    });
  });

  it('properly displaying errors', () => {
    expect(wrapper.find('div#error_password').length).toBe(1);
    expect(wrapper.find('div#error_from').length).toBe(1);
    expect(wrapper.find('div#error_to').length).toBe(1);
    expect(wrapper.find('div#error_amount').length).toBe(1);
    expect(wrapper.find('div#error_balance').length).toBe(1);
  });

  it('handles cancel click', () => {
    wrapper
      .find('button')
      .findWhere(el => el.text() === 'Cancel')
      .first()
      .simulate('click');

      expect(onClose.mock.calls.length).toBe(1);
  });
});
