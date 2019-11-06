import { runSaga } from 'redux-saga';
import { mockSaga } from 'redux-saga-mock';
import { createSetCredentials } from '../sagas';
import { expectSaga } from 'redux-saga-test-plan';
import { accountCreateSetCredentials, accountSetCreate } from '../actions';
import { ACCOUNT_CREATION_STAGES } from '..';
import bip from 'bip39';
import { Fantom } from '~/utility/web3';

describe('account sagas', () => {
  it('createSetCredentials', async done => {
    bip.generateMnemonic = jest.fn().mockImplementation(() => 'MNEMONIC');
    Fantom.mnemonicToKeys = jest.fn().mockImplementation(() => ({ publicAddress: '0xFF' }));

    const create = {
      name: 'NAME',
      password: 'PASSWORD',
      icon: '123',
    };

    const result = await expectSaga(createSetCredentials, accountCreateSetCredentials(create))
      .put(
        accountSetCreate({
          ...create,
          stage: ACCOUNT_CREATION_STAGES.INFO,
          publicAddress: '0xFF',
          mnemonic: 'MNEMONIC',
        })
      )
      .run();

    done();
  });

  // it('createSetConfirm hangs on')
});
