import React, { ChangeEvent } from 'react';
import { AccountCreateInfoUnconnected } from '.';
import { mount } from 'enzyme';
import { EMPTY_ACCOUNT, CONFIRMATION_PHRASE } from '~/redux/account/constants';
import styles from './styles.module.scss';
import { URLS } from '~/constants/urls';
import { act } from 'react-dom/test-utils';

describe('', () => {
  const accountCreateSetInfo = jest.fn();
  const accountSetCreateStage = jest.fn();
  const mnemonic = 'One Two Three Four';

  const wrapper = mount(
    <AccountCreateInfoUnconnected
      password="password"
      name="name"
      icon="icon"
      publicAddress="publicAddress"
      mnemonic={mnemonic}
      accountSetCreateStage={accountSetCreateStage}
      accountCreateSetInfo={accountCreateSetInfo}
    />
  );

  const prev = wrapper.find(`button#account_prev_button`);
  const next = wrapper.find(`button#account_next_button`);

  it('displays mnemonic words', () => {
    expect(wrapper.find(`.${styles.word}`).length).toBe(4);
  });

  it('not proceeds until reveal words and type phrase', () => {
    next.simulate('click');
    expect(accountCreateSetInfo.mock.calls.length).toBe(0);

    expect(wrapper.find(`.${styles.overlay}`).length).toBe(1);

    act(() => {
      wrapper.find(`.${styles.overlay}`).simulate('click');
    });

    wrapper.update();

    expect(wrapper.find(`.${styles.overlay}`).length).toBe(0);

    act(() => {
      wrapper.find('input[name="phrase"]').prop('onChange')({
        target: { value: CONFIRMATION_PHRASE },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();

    next.simulate('click');

    expect(accountSetCreateStage.mock.calls).toEqual([]);
    expect(accountCreateSetInfo.mock.calls).toEqual([[]]);
  });
});
