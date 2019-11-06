import React from 'react';
import { mount } from 'enzyme';
import { AccountCreateConfirmUnconnected } from '.';
import styles from './styles.module.scss';

describe('AccountCreateConfirm', () => {
  const mnemonic = 'AAA BBB CCC DDD EEE FFF GGG HHH III JJJ KKK LLL';
  const accountSetCreateStage = jest.fn();
  const accountCreateCancel = jest.fn();
  const accountCreateSetConfirm = jest.fn();

  const wrapper = mount(
    <AccountCreateConfirmUnconnected
      mnemonic={mnemonic}
      accountSetCreateStage={accountSetCreateStage}
      accountCreateCancel={accountCreateCancel}
      accountCreateSetConfirm={accountCreateSetConfirm}
    />
  );

  const create_button = wrapper.find('button.btn-primary.bordered');
  const cancel_button = wrapper.find('button.secondary.bordered');

  it('actually mounts', () => {
    expect(wrapper.find(`.${styles.content}`).length).toBe(1);
    expect(wrapper.find(`.${styles.mnemonic_container}`).children().length).toBe(0);
    expect(wrapper.find(`.${styles.mnemonic_selector}`).children().length).toBe(12);
  });

  it('not proceeds until mnemonics filled', () => {
    expect(accountSetCreateStage.mock.calls.length).toBe(0);
    expect(accountCreateCancel.mock.calls.length).toBe(0);
    expect(accountCreateSetConfirm.mock.calls.length).toBe(0);

    create_button.simulate('click');

    expect(accountCreateSetConfirm.mock.calls.length).toBe(0);
  });

  it('click adds mnemonics', () => {
    const buttons = wrapper.find(`.${styles.mnemonic_selector}`).find('button');

    expect(buttons.length).toBe(12);

    for (let i = 0; i < buttons.length; i += 1) {
      buttons.at(i).simulate('click');

      wrapper.update();

      expect(wrapper.find(`.${styles.mnemonic_container}`).children().length).toBe(i + 1);
    }
  });

  it('click removes mnemonics', () => {
    const buttons = wrapper.find(`.${styles.mnemonic_container}`).find('button');

    expect(buttons.length).toBe(12);

    for (let i = 0; i < buttons.length; i += 1) {
      buttons.at(i).simulate('click');

      wrapper.update();

      expect(wrapper.find(`.${styles.mnemonic_container}`).children().length).toBe(12 - (i + 1));
    }
  });

  it('calling account creation', () => {
    const words = mnemonic.split(' ');

    expect(wrapper.find(`.${styles.mnemonic_container}`).children().length).toBe(0);

    for (let i = 0; i < words.length; i += 1) {
      const item = wrapper
        .find(`.${styles.mnemonic_selector}`)
        .children()
        .findWhere(el => el.type() === 'button' && el.text() === words[i]);

      item.simulate('click');
      wrapper.update();
    }

    expect(wrapper.find(`.${styles.mnemonic_container}`).children().length).toBe(12);

    wrapper.find('button.btn-primary.bordered').simulate('click');

    expect(accountCreateSetConfirm.mock.calls[0]).toEqual([]);
  });
});
