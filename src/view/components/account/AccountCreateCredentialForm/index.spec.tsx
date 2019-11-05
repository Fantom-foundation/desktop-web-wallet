import React, { ChangeEvent } from 'react';
import { AccountCreateCredentialForm } from '.';
import { mount } from 'enzyme';
import { EMPTY_ACCOUNT } from '~/redux/account/constants';
import styles from './styles.module.scss';
import { URLS } from '~/constants/urls';
import { act } from 'react-dom/test-utils';

describe('', () => {
  const push = jest.fn();
  const onSubmit = jest.fn();
  const list = {
    ACCOUNT: { ...EMPTY_ACCOUNT, id: 'ACCOUNT', publicAddress: 'ADDRESS', name: 'ACCOUNT' },
  };

  const wrapper = mount(
    <AccountCreateCredentialForm list={list} push={push} onSubmit={onSubmit} />
  );

  const prev = wrapper.find(`.btn-secondary`).first();
  const next = wrapper.find(`.btn-secondary`).at(1);
  const name = wrapper.find('input[name="name"]');

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find(`.${styles.form}`).exists()).toBe(true);
    expect(name.length).toBe(1);
  });

  it('hang on empty fields', () => {
    // No inputs

    next.simulate('click');

    expect(wrapper.find(`#error_name_required`).length).toBe(1);
    expect(wrapper.find(`#error_name_exists`).length).toBe(0);
    expect(wrapper.find(`#error_password_required`).length).toBe(1);
    expect(wrapper.find(`#error_password_mismatch`).length).toBe(0);
  });

  it('hangs on conflicting account name', () => {
    act(() => {
      wrapper.find('input[name="name"]').prop('onChange')({
        target: { value: 'ACCOUNT' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_name_required`).length).toBe(0);
    expect(wrapper.find(`#error_name_exists`).length).toBe(1);
  });

  it('proceeds with proper name', () => {
    act(() => {
      wrapper.find('input[name="name"]').prop('onChange')({
        target: { value: 'ANOTHER' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_name_required`).length).toBe(0);
    expect(wrapper.find(`#error_name_exists`).length).toBe(0);
  });

  it('hangs on not-matching passwords', () => {
    act(() => {
      wrapper.find('input[name="password"]').prop('onChange')({
        target: { value: 'Password1' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_password_required`).length).toBe(0);
    expect(wrapper.find(`#error_password_mismatch`).length).toBe(1);
  });

  it('hangs on too-simple password', () => {
    act(() => {
      wrapper.find('input[name="password"]').prop('onChange')({
        target: { value: 'Password' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_password_required`).length).toBe(1);

    act(() => {
      wrapper.find('input[name="password"]').prop('onChange')({
        target: { value: 'password1' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_password_required`).length).toBe(1);

    act(() => {
      wrapper.find('input[name="password"]').prop('onChange')({
        target: { value: 'Pa1' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_password_required`).length).toBe(1);

    act(() => {
      wrapper.find('input[name="password"]').prop('onChange')({
        target: { value: 'Password1' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(wrapper.find(`#error_password_required`).length).toBe(0);
  });

  it('prev button leads to home', () => {
    prev.simulate('click');
    expect(push.mock.calls[0][0]).toEqual(URLS.ROOT);
  });

  it('has icons', () => {
    expect(wrapper.find(`.${styles.icons}`).children().length).toBe(7);
  });

  it('properly submitting data', () => {
    act(() => {
      wrapper.find('input[name="name"]').prop('onChange')({
        target: { value: 'ACCOUNT2' },
      } as ChangeEvent<HTMLInputElement>);

      wrapper.find('input[name="password"]').prop('onChange')({
        target: { value: 'Password123' },
      } as ChangeEvent<HTMLInputElement>);

      wrapper.find('input[name="password_again"]').prop('onChange')({
        target: { value: 'Password123' },
      } as ChangeEvent<HTMLInputElement>);
    });

    wrapper.update();
    next.simulate('click');

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0].name).toBe('ACCOUNT2');
    expect(onSubmit.mock.calls[0][0].password).toBe('Password123');
    expect(onSubmit.mock.calls[0][0].icon.length).toBeGreaterThan(1);
  });
});
