import assocPath from 'ramda/es/assocPath';
import {
  accountSetCreate,
  accountSetCreateStage,
  accountSetList,
  accountAddAccount,
  accountSetAccount,
} from '~/redux/account/actions';
import { IAccountState, ACCOUNT_INITIAL_STATE } from '.';
import { ACCOUNT_ACTIONS } from './constants';

const setCreate = (state: IAccountState, { create }: ReturnType<typeof accountSetCreate>) =>
  assocPath(['create'], { ...state.create, ...create }, state);

const createClear = (state: IAccountState) =>
  assocPath(['create'], ACCOUNT_INITIAL_STATE.create, state);

const setCreateStage = (
  state: IAccountState,
  { stage }: ReturnType<typeof accountSetCreateStage>
) => assocPath(['create', 'stage'], stage, state);

const setList = (state: IAccountState, { list }: ReturnType<typeof accountSetList>) =>
  assocPath(['list'], list, state);

const addAccount = (state: IAccountState, { account }: ReturnType<typeof accountAddAccount>) =>
  assocPath(['list'], { ...state.list, [account.public_address]: account }, state);

const setAccount = (state: IAccountState, { id, data }: ReturnType<typeof accountSetAccount>) =>
  assocPath(['list'], { ...state.list, [id]: { ...(state.list[id] || {}), ...data } }, state);

export const ACCOUNT_HANDLERS = {
  [ACCOUNT_ACTIONS.SET_CREATE]: setCreate,
  [ACCOUNT_ACTIONS.SET_CREATE_STAGE]: setCreateStage,
  [ACCOUNT_ACTIONS.SET_LIST]: setList,
  [ACCOUNT_ACTIONS.CREATE_CLEAR]: createClear,
  [ACCOUNT_ACTIONS.ADD_ACCOUNT]: addAccount,
  [ACCOUNT_ACTIONS.SET_ACCOUNT]: setAccount,
};
