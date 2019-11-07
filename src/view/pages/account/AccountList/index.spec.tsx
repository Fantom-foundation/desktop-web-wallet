import React from 'react';
import { AccountListUnconnected } from '.';
import { mount } from 'enzyme';
import { EMPTY_ACCOUNT } from '~/redux/account/constants';
import styles from './styles.module.scss';
import { URLS } from '~/constants/urls';

describe('AccountList', () => {
  const push = jest.fn();
  const accounts = {
    ACCOUNT: { ...EMPTY_ACCOUNT, id: 'ACCOUNT', publicAddress: 'ADDRESS' },
  };

  const wrapper = mount(<AccountListUnconnected list={accounts} push={push} />);

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find(`.${styles.grid}`).exists()).toBe(true);
  });

  it('renders account list', () => {
    expect(wrapper.find(`.${styles.card}`).length).toBe(1);
  });

  it('handles card click', () => {
    const card = wrapper.find(`.${styles.card}`).first();
    card.simulate('click');
    expect(push.mock.calls[0][0]).toBe(URLS.ACCOUNT.BASE('ADDRESS'));
  });
});
