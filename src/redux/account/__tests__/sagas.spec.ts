import { ACCOUNT_SAGAS } from '../sagas';
import { expectSaga } from 'redux-saga-test-plan';
import {
  accountCreateSetCredentials,
  accountSetCreate,
  accountCreateRestoreMnemonics,
  accountGetBalance,
  accountSendFunds,
} from '../actions';
import { ACCOUNT_CREATION_STAGES, ACCOUNT_INITIAL_STATE } from '..';
import bip from 'bip39';
import { Fantom } from '~/utility/web3';
import { assocPath } from 'ramda';
import { ACCOUNT_ACTIONS } from '../constants';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';

describe('account sagas', () => {
  bip.generateMnemonic = jest.fn().mockImplementation(() => 'MNEMONIC');
  Fantom.mnemonicToKeys = jest
    .fn()
    .mockImplementation((mnemonic: string) => ({ publicAddress: `${mnemonic}-0xFF` }));
  Fantom.getKeystore = jest.fn().mockImplementation(() => ({}));
  Fantom.getBalance = jest.fn().mockImplementation(() => '100000000000000000');
  Fantom.getPrivateKey = jest
    .fn()
    .mockImplementation((keystore, password) => `PRIVATE-${password}`);
  Fantom.isConnected = jest.fn().mockImplementation(() => Promise.resolve(true));

  Fantom.setProvider(new FakeProvider());

  describe('createSetCredentials', () => {
    it('createSetCredentials', async done => {
      const create = {
        name: 'NAME',
        password: 'PASSWORD',
        icon: '123',
      };

      await expectSaga(ACCOUNT_SAGAS.createSetCredentials, accountCreateSetCredentials(create))
        .put(
          accountSetCreate({
            ...create,
            stage: ACCOUNT_CREATION_STAGES.INFO,
            publicAddress: 'MNEMONIC-0xFF',
            mnemonic: 'MNEMONIC',
          })
        )
        .run();

      done();
    });
  });

  describe('createSetConfirm', () => {
    const initial = {
      account: {
        create: {
          mnemonic: 'AAA AAA',
          password: 'PASSWORD',
          name: 'NAME',
          icon: 'ICON',
          publicAddress: '0xff',
        },
      },
    };

    it('createSetConfirm hangs on insufficient credentials', async done => {
      const fields = ['name', 'password', 'mnemonic', 'icon', 'publicAddress'];

      for (let i = 0; i < fields.length; i += 1) {
        await expectSaga(ACCOUNT_SAGAS.createSetConfirm)
          .withState(assocPath(['account', 'create', fields[i]], null, initial))
          .put(accountSetCreate(ACCOUNT_INITIAL_STATE.create))
          .run();
      }

      done();
    });

    it('createSetConfirm proceeds on valid data', async done => {
      await expectSaga(ACCOUNT_SAGAS.createSetConfirm)
        .withState(initial)
        .put.like({ action: { type: ACCOUNT_ACTIONS.ADD_ACCOUNT } })
        .put.like({ action: { type: CALL_HISTORY_METHOD } })
        .run();

      done();
    });
  });

  describe('createCancel', () => {
    it('createCancel clears store', async done => {
      await expectSaga(ACCOUNT_SAGAS.createCancel)
        .put.like({ action: { type: ACCOUNT_ACTIONS.CREATE_CLEAR } })
        .run();

      done();
    });
  });

  describe('createRestoreMnemonics', () => {
    const initial = {
      account: {
        create: {
          mnemonic: 'MNEMONIC',
          password: 'PASSWORD',
          name: 'NAME',
          icon: 'ICON',
          publicAddress: 'MNEMONIC-0xff',
        },
      },
    };

    it('createRestoreMnemonics creates account from mnemonic', async done => {
      await expectSaga(
        ACCOUNT_SAGAS.createRestoreMnemonics,
        accountCreateRestoreMnemonics({ mnemonic: 'MNEMONIC' })
      )
        .withState(initial)
        .put.like({
          action: {
            type: ACCOUNT_ACTIONS.SET_CREATE,
            create: { mnemonic: 'MNEMONIC', publicAddress: 'MNEMONIC-0xFF' },
          },
        })
        .put.like({ action: { type: ACCOUNT_ACTIONS.ADD_ACCOUNT } })
        .put.like({ action: { type: CALL_HISTORY_METHOD } })
        .run();

      done();
    });
  });

  describe('getBalance', () => {
    const initial = {
      account: {
        list: {
          ACCOUNT: {},
        },
      },
    };

    it('getBalance stops on inexist account', async done => {
      await expectSaga(ACCOUNT_SAGAS.getBalance, accountGetBalance('ANOTHER_ACCOUNT'))
        .withState(initial)
        .not.put.actionType(ACCOUNT_ACTIONS.SET_ACCOUNT);

      done();
    });

    it('getBalance gets balance', async done => {
      await expectSaga(ACCOUNT_SAGAS.getBalance, accountGetBalance('ACCOUNT'))
        .withState(initial)
        .put.like({
          action: {
            type: ACCOUNT_ACTIONS.SET_ACCOUNT,
            id: 'ACCOUNT',
            data: { is_loading_balance: true },
          },
        })
        .put.like({
          action: {
            type: ACCOUNT_ACTIONS.SET_ACCOUNT,
            id: 'ACCOUNT',
            data: { is_loading_balance: false, balance: '0.1' },
          },
        })
        .run();

      done();
    });
  });

  describe('sendFunds', () => {
    Web3.utils.isAddress = jest.fn().mockImplementation(addr => addr === '0xFF');
    Fantom.transfer = jest.fn().mockImplementation(() => {
      return true;
    });
    
    if (!Fantom.web3) {
      throw new Error('web3 undefined');
    }

    Fantom.web3.eth.getGasPrice = jest.fn().mockImplementation(() => '40000');
    Fantom.web3.eth.estimateGas = jest.fn().mockImplementation(() => '40000');

    const initial = {
      account: {
        list: {
          '0xFF': {},
        },
      },
    };

    const data = {
      from: '0xFF',
      to: '0xFF',
      amount: '0.1',
      password: 'PASSWORD',
      message: 'MESSAGE',
    };

    it('sendFunds sending funds', async done => {
      await expectSaga(ACCOUNT_SAGAS.sendFunds, accountSendFunds(data))
        .withState(initial)
        .call.like({ fn: Fantom.getPrivateKey })
        .call.like({ fn: Fantom.transfer })
        .put.like({
          action: {
            type: ACCOUNT_ACTIONS.SET_TRANSFER,
            transfer: { is_sent: true },
          },
        })
        .run();

      done();
    });

    it('sendFunds validation works', async done => {
      await expectSaga(
        ACCOUNT_SAGAS.sendFunds,
        accountSendFunds({
          from: '0xFF',
          to: '',
          amount: '0',
          password: '',
          message: '',
        })
      )
        .withState(initial)
        .not.put.like({
          action: {
            type: ACCOUNT_ACTIONS.SET_TRANSFER,
            transfer: { is_sent: true },
          },
        })
        .run();

      done();
    });
  });
});
