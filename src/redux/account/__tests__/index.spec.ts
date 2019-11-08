import { ACCOUNT_INITIAL_STATE, account, ACCOUNT_CREATION_STAGES } from '..';
import {
  accountSetCreate,
  accountSetCreateStage,
  accountSetList,
  accountCreateClear,
  accountAddAccount,
  accountSetAccount,
} from '../actions';
import { EMPTY_ACCOUNT } from '../constants';

describe('account reducer', () => {
  const state = ACCOUNT_INITIAL_STATE;
  const changed_create = {
    stage: ACCOUNT_CREATION_STAGES.INFO,
    name: 'NAME',
    password: 'PASSWORD',
    icon: 'ICON',
    publicAddress: 'ADDRESS',
    mnemonic: 'MNEMONIC',
    errors: { FIELD: 'ERROR' },
  };

  it('setCreate', () => {
    expect(account(state, accountSetCreate(changed_create))).toEqual({
      ...state,
      create: {
        ...changed_create,
      },
    });
  });

  it('setCreateStage', () => {
    expect(account(state, accountSetCreateStage(ACCOUNT_CREATION_STAGES.INFO))).toEqual({
      ...state,
      create: {
        ...state.create,
        stage: ACCOUNT_CREATION_STAGES.INFO,
      },
    });
  });

  it('setList', () => {
    expect(account(state, accountSetList(null))).toEqual({
      ...state,
      list: null,
    });
  });

  it('accountCreateClear', () => {
    expect(account(account(state, accountSetCreate(changed_create)), accountCreateClear())).toEqual(
      {
        ...state,
      }
    );
  });

  it('addAccount', () => {
    expect(
      account(state, accountAddAccount({ ...EMPTY_ACCOUNT, publicAddress: 'ACCOUNT' }))
    ).toEqual({
      ...state,
      list: {
        ACCOUNT: { ...EMPTY_ACCOUNT, publicAddress: 'ACCOUNT' },
      },
    });
  });

  it('setAccount', () => {
    expect(
      account(
        account(state, accountAddAccount({ ...EMPTY_ACCOUNT, publicAddress: 'ACCOUNT' })),
        accountSetAccount('ACCOUNT', { name: 'NAME' })
      )
    ).toEqual({
      ...state,
      list: {
        ACCOUNT: { ...EMPTY_ACCOUNT, publicAddress: 'ACCOUNT', name: 'NAME' },
      },
    });
  });
});
